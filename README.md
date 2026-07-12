# Design System

[English](README.md) | [简体中文](README.zh-CN.md)

Aurora is a design specification with a static reference preview for modern SaaS products. It defines semantic tokens, reusable interaction patterns, and component contracts; it does not currently ship a framework component package.

## Highlights

- A refined visual system with layered gradients, depth, and accessible contrast
- Clear documentation for design principles, styles, and components
- An interactive static preview that demonstrates the specification in context

## Project Structure

- [aurora/README.md](aurora/README.md) — overview of the design system documentation
- [aurora/preview/index.html](aurora/preview/index.html) — interactive preview page
- [aurora/preview/styles.css](aurora/preview/styles.css) — preview styles and motion effects

## Preview locally

Open [aurora/preview/index.html](aurora/preview/index.html) directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000/aurora/preview/](http://localhost:8000/aurora/preview/).

## Effect Preview

![Aurora preview](aurora/preview/preview-dark.png)
![Aurora preview](aurora/preview/preview-light.png)

## Documentation

- [aurora/DESIGN.md](aurora/DESIGN.md)
- [aurora/STYLES.md](aurora/STYLES.md)
- [aurora/COMPONENTS.md](aurora/COMPONENTS.md)
