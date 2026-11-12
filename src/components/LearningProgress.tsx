import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const key = 'modern-tech-learning:completed:v1';

function loadCompleted(): string[] {
  const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
  return Array.isArray(saved) ? saved.filter(value => typeof value === 'string') : [];
}

export function LessonProgress({ id }: { id: string }) {
  const [done, setDone] = useState<boolean | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setDone(loadCompleted().includes(id));
    } catch {
      setError(true);
    }
  }, [id]);

  function toggle() {
    try {
      const completed = new Set(loadCompleted());
      if (completed.has(id)) completed.delete(id);
      else completed.add(id);
      localStorage.setItem(key, JSON.stringify([...completed]));
      setDone(completed.has(id));
      setError(false);
    } catch {
      setError(true);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-input bg-secondary px-4 py-3">
      <span role="status">{error ? '此浏览器无法保存进度。' : done ? '本课已完成，进度已保存。' : '进度保存在此浏览器。'}</span>
      <Button type="button" aria-pressed={done ?? false} disabled={done === null} onClick={toggle}>
        {done ? '取消完成' : '标记为已完成'}
      </Button>
    </div>
  );
}

type Lesson = { id: string; title: string; number: string; summary: string };

export function CourseProgress({ lessons }: { lessons: Lesson[] }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    function refresh() {
      try {
        setCompleted(loadCompleted());
        setError(false);
      } catch {
        setError(true);
      }
      setLoaded(true);
    }
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('pageshow', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('pageshow', refresh);
    };
  }, []);

  const count = lessons.filter(lesson => completed.includes(lesson.id)).length;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <section className="course-progress not-content" aria-label="章节与进度">
      <p className="course-count" role="status">
        {error ? '此浏览器无法读取进度' : loaded ? `已完成 ${count} / ${lessons.length} 课` : `共 ${lessons.length} 课`}
      </p>
      <ol className="lesson-list">
        {lessons.map(lesson => (
          <li key={lesson.id}>
            <span className="lesson-number" aria-hidden="true">{lesson.number}</span>
            <div>
              <a href={`${base}/${lesson.id}/`}>{lesson.title}</a>
              <p>{lesson.summary}</p>
            </div>
            {completed.includes(lesson.id) && <span className="done-label">已完成</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
