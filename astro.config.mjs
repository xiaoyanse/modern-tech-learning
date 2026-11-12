import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { courses, isPublishedLesson } from './src/data/courses.mjs';

export default defineConfig({
  site: 'https://xiaoyanse.github.io',
  base: '/modern-tech-learning',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: '现代技术学习手册',
      favicon: '/favicon.png',
      description: '按场景学习现代软件、AI 与 UI 技术，学习后端技术选型和系统架构。',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      social: [{ icon: 'github', label: 'GitHub 源码', href: 'https://github.com/xiaoyanse/modern-tech-learning' }],
      customCss: ['./src/styles/site.css'],
      components: { Footer: './src/components/Footer.astro' },
      sidebar: [
        { label: '课程首页', link: '/' },
        ...courses.map(({ id, title, lessons }) => {
          const planned = !lessons.some(isPublishedLesson);
          return {
            label: planned ? title + '（规划中）' : title,
            items: [
              { label: planned ? '课程规划' : '学习路线', slug: id },
              ...lessons.map(lesson => ({
                label: lesson.number + ' ' + lesson.title + (isPublishedLesson(lesson) ? '' : '（大纲）'),
                slug: lesson.id,
              })),
            ],
          };
        }),
        { label: '学习工具', items: [
          { label: '技术索引', slug: 'technologies' },
          { label: 'AI 提示词库', slug: 'prompts' },
        ] },
      ],
    }),
    react(),
  ],
  vite: { plugins: [tailwindcss()] },
});
