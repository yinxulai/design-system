# Design System

[English](README.md) | [简体中文](README.zh-CN.md)

Aurora 是一套面向现代 SaaS 产品的设计规范，并提供静态参考预览。它定义语义化设计令牌、可复用交互模式和组件合同，但目前不提供可直接安装的框架组件包。

仓库也会发布可供 shadcn 安装的 Registry JSON。根构建会自动发现每个 `<设计系统>/component/registry.json`，因此多套设计系统可以共用一个 Cloudflare Pages 项目，而不需要维护写死的构建路径。

本入口提供中文说明；Aurora 的详细规范正文目前使用英文编写，请从 [aurora/README.md](aurora/README.md) 进入。

## 亮点

- 具有层次分明渐变、深度感和可访问对比度的精致视觉系统
- 为设计原则、样式和组件提供清晰的文档说明
- 提供交互式静态预览，展示规范在真实场景中的应用效果

## 项目结构

- [aurora/README.md](aurora/README.md) — 设计系统文档总览
- [aurora/preview/index.html](aurora/preview/index.html) — 交互式预览页面
- [aurora/preview/styles.css](aurora/preview/styles.css) — 预览样式与动画效果
- [site/](site/) — Registry 首页源文件（构建后发布到 Cloudflare 根路径）
- [DEPLOYMENT.md](DEPLOYMENT.md) — Cloudflare Pages 与多 Registry 发布说明

## Registry 构建

```bash
npm run build
```

生成的 `output/registries.json` 会列出全部设计系统。每套 Registry 使用独立路径，例如 `/aurora/r/button.json`。Cloudflare Git 集成的具体设置请参阅 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 本地预览

直接在浏览器中打开 [aurora/preview/index.html](aurora/preview/index.html)，或者在本地启动一个静态服务：

```bash
python3 -m http.server 8000
```

随后访问 [http://localhost:8000/aurora/preview/](http://localhost:8000/aurora/preview/)。

## 效果预览

![Aurora preview](aurora/preview/preview-dark.png)
![Aurora preview](aurora/preview/preview-light.png)

## 文档

- [aurora/DESIGN.md](aurora/DESIGN.md)
- [aurora/STYLES.md](aurora/STYLES.md)
- [aurora/COMPONENTS.md](aurora/COMPONENTS.md)
