# 现代技术学习手册

[在线学习](https://xiaoyanse.github.io/modern-tech-learning/) · [GitHub Pages 发布记录](https://github.com/xiaoyanse/modern-tech-learning/actions/workflows/pages.yml)

- **现代软件与 AI 技术认知课**：9 期，覆盖软件架构、视觉与端侧 AI、Agent、数据、前端与桌面、AI Coding、协作、安全与可靠性。
- **现代 UI 技术组合与设计系统**：4 课，覆盖技术组合、统一规范、场景选型、AI 开发与 UI 验收。

课程正文来自两套对话课程的整理，保留案例与技术对比。较早的 32 节深度课程不在此范围。技术状态、兼容性和授权以官方资料为准。

Starlight 负责静态课程页面、导航和 Pagefind 全文搜索。学习进度、提示词复制及 UI 练习使用 React、Tailwind CSS 和 shadcn/ui。完成状态保存在当前站点的浏览器本地存储中，无需登录。

## 本地开发

使用 Node.js 24 或以上版本。

```sh
npm ci
npm run dev
npm run build
npm run preview
```

本地地址以终端输出为准，路径包含 `/modern-tech-learning/`。全文搜索需要先构建，再用预览服务打开。

## 内容维护

- 课程正文在 `src/content/docs/tech/` 与 `src/content/docs/ui/`。
- 新课需同时登记到 `src/data/courses.mjs`，其中稳定的课程 ID 用于进度保存。
- 提示词库条目在 `src/data/prompts.json`。课程正文中的对应提示词同样可复制。
- shadcn/ui 的 Button 来自其 [New York 官方注册表](https://ui.shadcn.com/r/styles/new-york/button.json)。
- GitHub Pages 发布来源设为 GitHub Actions。推送至 `main` 后自动构建、索引并发布 `dist/`。
