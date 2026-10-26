'use client';

import { useEffect } from 'react';

// Elements that switch the cursor into its "hovered" state. Matched with
// closest() from the event target so elements rendered after mount are covered.
const HOVER_SELECTOR =
  'a,button,input,select,.service-card,.project-card,.value-card,.testimonial';

export default function Cursor() {
  useEffect(() => {
    // The custom cursor is pointless without a precise pointer; leave the native cursor alone.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

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

    // Recolour the cursor for the background it currently sits on. Driven from
    // the animation frame rather than every mousemove, so a burst of pointer
    // events costs one style read per frame instead of one per event.
    const syncColor = () => {
      const isDark = isDarkColor(getRGB(getBackgroundColorUnderCursor(mx, my)));
      if (cur) cur.style.background = isDark ? '#FFFFFF' : 'var(--ink)';
      if (ring) {
        ring.style.borderColor = isDark
          ? 'rgba(255, 255, 255, 0.35)'
          : 'rgba(0, 0, 0, 0.22)';
      }
    };

    let colorDirty = false;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      colorDirty = true;
      if (cur) {
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
      }
      // Without the animation loop the ring must track the pointer directly,
      // otherwise it would sit frozen at its last smoothed position. The colour
      // is normally synced per frame, so it must be synced here instead.
      if (reduceMotion) {
        rx = mx;
        ry = my;
        if (ring) {
          ring.style.left = mx + 'px';
          ring.style.top = my + 'px';
        }
        colorDirty = false;
        syncColor();
      }
    };

    const handleMouseDown = () => {
      cur?.classList.add('clicking');
    };

    const handleMouseUp = () => {
      cur?.classList.remove('clicking');
    };

    // Event delegation: hover state is resolved from the event target, so
    // elements added after mount (mobile menu, footer success message) are covered.
    const setHovered = (on: boolean) => {
      cur?.classList.toggle('hovered', on);
      ring?.classList.toggle('hovered', on);
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest(HOVER_SELECTOR)) setHovered(true);
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element) || !target.closest(HOVER_SELECTOR)) return;
      // Moving between two hover targets must not flicker the cursor off.
      const related = e.relatedTarget;
      if (related instanceof Element && related.closest(HOVER_SELECTOR)) return;
      setHovered(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);

    // Animate ring. Under reduced motion the smoothing loop is skipped entirely
    // and the ring follows the pointer directly (see handleMouseMove).
    let rafId = 0;
    const animRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      if (colorDirty) {
        colorDirty = false;
        syncColor();
      }
      rafId = requestAnimationFrame(animRing);
    };
    if (!reduceMotion) rafId = requestAnimationFrame(animRing);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
    </>
  );
}
