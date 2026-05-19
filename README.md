# Cortexture

A premium portfolio website built with **Next.js 14**, **TypeScript**, and **React 18**. Features an interactive mesh canvas, custom cursor, smooth animations, and a responsive design system.

## Features

- ✨ Interactive mesh canvas with mouse tracking
- 🎯 Custom cursor with hover effects
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern design system with CSS custom properties
- ⚡ Server-side rendering with Next.js
- 🔤 TypeScript for type safety
- 🎭 Smooth scroll reveals and animations
- 📧 Contact form with form validation
- 🌐 SEO optimized with Next.js metadata API

## Tech Stack

- **Framework**: Next.js 14.0+
- **Language**: TypeScript 5
- **UI Library**: React 18.2+
- **Styling**: CSS3 (Global styles with CSS custom properties)
- **Animations**: CSS animations and requestAnimationFrame

## Project Structure

```
cortexture/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
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
- npm or yarn

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

```bash
npm run build
npm start
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
- Form validation
- Expands on input
- Ready for Supabase integration (see comments in Footer.tsx)

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
Edit component files in `components/` directory to modify:
- Services data
- Projects showcase
- Team values
- Testimonials

## Performance Optimizations

- Server Components where possible
- CSS animations instead of JS for performance
- Efficient canvas rendering with requestAnimationFrame
- Intersection Observer for lazy scroll reveals
- Optimized image formats and lazy loading ready

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Integration Ready

### Supabase Integration
The contact form in `Footer.tsx` includes comments showing how to integrate with Supabase:
```typescript
// See Footer.tsx for commented integration code
const { error } = await supabase
  .from('leads')
  .insert({ idea, name, email, service, budget });
```

## License

© 2025 Cortexture Studio. All rights reserved.

## Support

For questions or issues, please refer to the original HTML implementation or check Next.js documentation.
