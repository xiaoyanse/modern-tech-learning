import { useState } from 'react';
import { Button } from './ui/button';

export function PromptCopy({ title, value }: { title: string; value: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="not-content flex flex-wrap items-center gap-3">
      <Button type="button" size="sm" variant="outline" aria-label={`复制：${title}`} onClick={copy}>复制提示词</Button>
      <span role="status" className="text-sm">
        {status === 'success' ? '已复制' : status === 'error' ? '无法访问剪贴板，请手动选择上方正文复制。' : ''}
      </span>
    </div>
  );
}
