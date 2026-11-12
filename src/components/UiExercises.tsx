import { useState } from 'react';
import { Button } from './ui/button';

const colors = [
  { label: '墨绿', value: '#146452' },
  { label: '深蓝', value: '#234e96' },
  { label: '深紫', value: '#71359a' },
];

export function TokenDemo() {
  const [color, setColor] = useState(colors[0].value);
  const [compact, setCompact] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <div className="not-content grid gap-4 rounded-lg border border-input p-4">
      <fieldset className="flex flex-wrap gap-2 border-0 p-0">
        <legend className="mb-2 font-semibold">选择主色</legend>
        {colors.map(option => (
          <Button key={option.value} type="button" size="sm"
            variant={color === option.value ? 'default' : 'outline'}
            aria-pressed={color === option.value}
            onClick={() => setColor(option.value)}>{option.label}</Button>
        ))}
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <label><input type="checkbox" checked={compact} onChange={e => setCompact(e.target.checked)} /> 紧凑间距</label>
        <label><input type="checkbox" checked={rounded} onChange={e => setRounded(e.target.checked)} /> 大圆角</label>
        <label><input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} /> 深色主题</label>
      </div>
      <div
        aria-label="设计令牌预览"
        className="border border-input"
        style={{ borderRadius: rounded ? 20 : 5, padding: compact ? 10 : 20,
          color: dark ? '#f8f6ed' : '#212320', background: dark ? '#232720' : '#f8f6ed' }}
      >
        <p className="font-semibold">设备运行概览</p>
        <div className="mt-2 flex flex-wrap gap-2" style={{ gap: compact ? 4 : 12 }}>
          {['在线 12 台', '待检 2 台'].map(label => (
            <span key={label} className="px-3 py-1" style={{ color: 'white', background: color, borderRadius: rounded ? 18 : 4 }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const checks = [
  '桌面和窄屏下能完成主要任务',
  '表单、弹窗和表格复用共享组件',
  '亮色与暗色主题下文字清晰',
  '键盘可达且焦点可见',
  '加载、空数据和错误状态可识别',
  '真实数据和关键交互已运行验证',
];

export function ReviewChecklist() {
  const [selected, setSelected] = useState<string[]>([]);
  const [copyState, setCopyState] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(checks.map(item =>
        `- [${selected.includes(item) ? 'x' : ' '}] ${item}`).join('\n'));
      setCopyState('已复制');
    } catch {
      setCopyState('无法访问剪贴板，请手动复制。');
    }
  }

  return (
    <fieldset className="not-content grid gap-2 rounded-lg border border-input p-4">
      <legend className="px-2 font-semibold">UI 质量验收</legend>
      <p role="status">已检查 {selected.length} / {checks.length} 项</p>
      {checks.map(item => (
        <label key={item} className="flex items-center gap-2">
          <input type="checkbox" checked={selected.includes(item)} onChange={e => {
            const checked = e.target.checked;
            setSelected(current => checked ? [...current, item] : current.filter(value => value !== item));
          }} />
          {item}
        </label>
      ))}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" onClick={copy}>复制验收清单</Button>
        <span role="status">{copyState}</span>
      </div>
    </fieldset>
  );
}
