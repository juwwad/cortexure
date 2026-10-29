# Axiom Inc.

A premium portfolio website built with **Next.js 14**, **TypeScript**, and **React 18**. Features an interactive mesh canvas, custom cursor, smooth animations, and a responsive design system.

## Features

- ✨ Interactive mesh canvas with mouse tracking
- 🎯 Custom cursor with hover effects
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern design system with CSS custom properties
- ⚡ Statically exported with Next.js (`output: "export"`)
- 🔤 TypeScript for type safety
- 🎭 Smooth scroll reveals and animations
- 📧 Contact form UI (front-end only — see below)
- 🌐 SEO optimized with the Next.js metadata API

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript 5
- **UI Library**: React 18.2+
- **Styling**: CSS3 (global styles with CSS custom properties)
- **Animations**: CSS animations and requestAnimationFrame

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (client component)
│   └── globals.css         # Global styles
├── components/
│   ├── Cursor.tsx          # Custom cursor component
│   ├── Navigation.tsx      # Navigation bar
│   ├── Hero.tsx            # Hero section with mesh canvas
│   ├── Services.tsx        # Services section
│   ├── Projects.tsx        # Projects showcase
│   ├── About.tsx           # About section
│   ├── Testimonials.tsx    # Client testimonials
│   └── Footer.tsx          # Footer with contact form
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

The app is configured with `output: "export"`, so `next build` writes a static
site to `out/`:

```bash
npm run build
npm start   # serves the exported site from out/ via `serve`
```

Lint the project with:

```bash
npm run lint
```

## Key Components

### Custom Cursor
- Follows mouse movement with smooth animation
- Expands on hover over interactive elements
- Can be customized through CSS variables

### Mesh Canvas
- Interactive animated mesh grid in hero section
- Responds to mouse movement
- Uses HTML5 Canvas API for performance

### Scroll Reveals
- Elements animate in as you scroll
- Intersection Observer API for efficient rendering
- Staggered animation delays

### Contact Form
- Terminal-style UI design
- Front-end state and validation
- Posts JSON to the endpoint in `NEXT_PUBLIC_CONTACT_ENDPOINT`. Because the
  site is a static export there is no server runtime, so the endpoint must be
  an external form/email service that accepts a JSON `POST` and allows CORS
  from the deployed origin (see `.env.example`).
- Without that variable the form refuses to fake a success: it shows an error
  and, if `NEXT_PUBLIC_CONTACT_EMAIL` is set, points the visitor at that
  address.

## Customization

### Colors
Edit CSS custom properties in `app/globals.css`:
```css
:root {
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --green: #2D6A4F;
  /* ... more colors ... */
}
```

### Typography
Fonts are loaded from Google Fonts in `app/layout.tsx`:
- **Syne**: Headlines (variable font)
- **DM Sans**: Body text
- **DM Mono**: Code/terminal text

### Content
Edit component files in the `components/` directory to modify:
- Services data
- Projects showcase
- Team values
- Testimonials

## Performance Optimizations

- Static export — no server runtime required
- CSS animations instead of JS for performance
- Efficient canvas rendering with requestAnimationFrame
- Intersection Observer for lazy scroll reveals

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## License

© 2025 Axiom Inc. Studio. All rights reserved.

## Support

For questions or issues, please check the Next.js documentation.
