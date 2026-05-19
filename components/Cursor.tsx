'use client';

import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    // Helper function to get RGB from color string
    const getRGB = (color: string): [number, number, number] | null => {
      // Handle rgb/rgba
      const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
      }

      // Handle hex colors
      const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      if (hexMatch) {
        return [
          parseInt(hexMatch[1], 16),
          parseInt(hexMatch[2], 16),
          parseInt(hexMatch[3], 16),
        ];
      }

      return null;
    };

    // Helper function to check if a color is dark (using luminance)
    const isDarkColor = (rgb: [number, number, number] | null): boolean => {
      if (!rgb) return false;
      const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return luminance < 0.5;
    };

    // Helper function to get background color of element under cursor
    const getBackgroundColorUnderCursor = (x: number, y: number): string => {
      const element = document.elementFromPoint(x, y);
      if (!element) return '';

      let current: Element | null = element;
      while (current) {
        const bgColor = window.getComputedStyle(current).backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          return bgColor;
        }
        current = current.parentElement;
      }

      return '';
    };

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cur) {
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';

        // Check background color and adjust cursor color
        const bgColor = getBackgroundColorUnderCursor(mx, my);
        const rgb = getRGB(bgColor);
        const isDark = isDarkColor(rgb);

        if (isDark) {
          cur.style.background = '#FFFFFF';
        } else {
          cur.style.background = 'var(--ink)';
        }
      }

      // Also update ring color
      if (ring) {
        const bgColor = getBackgroundColorUnderCursor(mx, my);
        const rgb = getRGB(bgColor);
        const isDark = isDarkColor(rgb);

        if (isDark) {
          ring.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        } else {
          ring.style.borderColor = 'rgba(0, 0, 0, 0.22)';
        }
      }
    };

    const handleMouseDown = () => {
      cur?.classList.add('clicking');
    };

    const handleMouseUp = () => {
      cur?.classList.remove('clicking');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Animate ring
    const animRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      requestAnimationFrame(animRing);
    };
    animRing();

    // Hover elements
    const hoverEls = document.querySelectorAll(
      'a,button,input,select,.service-card,.project-card,.value-card,.testimonial'
    );
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cur?.classList.add('hovered');
        ring?.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cur?.classList.remove('hovered');
        ring?.classList.remove('hovered');
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
    </>
  );
}
