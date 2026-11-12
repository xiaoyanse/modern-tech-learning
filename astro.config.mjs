import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { courses } from './src/data/courses.mjs';

export default defineConfig({
  site: 'https://xiaoyanse.github.io',
  base: '/modern-tech-learning',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: '现代技术学习手册',
      favicon: '/favicon.png',
      description: '从软件与 AI 技术全景到专业 UI，按场景认识技术、理解分工并练习选型。',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      social: [{ icon: 'github', label: 'GitHub 源码', href: 'https://github.com/xiaoyanse/modern-tech-learning' }],
      customCss: ['./src/styles/site.css'],
      components: { Footer: './src/components/Footer.astro' },
      sidebar: [
        { label: '课程首页', link: '/' },
        ...courses.map(({ id, title, lessons }) => ({
          label: title,
          items: [
            { label: '学习路线', slug: id },
            ...lessons.map(({ id, number, title }) => ({ label: number + ' ' + title, slug: id })),
          ],
        })),
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
