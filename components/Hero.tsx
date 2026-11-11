'use client';

import { useEffect, useRef } from 'react';

interface Point {
    ox: number;
    oy: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

// Grid spacing, pointer influence radius and peak displacement of the hero mesh.
const SPACING = 68;
const RADIUS = 230;
const STRENGTH = 34;

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context');
            return;
        }

        let W = 0;
        let H = 0;
        let pts: Point[] = [];
        let rafId = 0;
        let running = false;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Pointer target. When the pointer is away from the hero the target is
        // parked far off-canvas, so every point relaxes back to its rest grid.
        let active = false;
        let mX = 0;
        let mY = 0;

        function resizeMesh() {
            if (!canvas || !ctx) return;
            // Cap the backing store at 2x: beyond that the extra pixels cost
            // fill rate without a visible gain on the faint mesh.
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = canvas.offsetWidth;
            H = canvas.offsetHeight;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initPts();
        }

        function initPts() {
            pts = [];
            const cols = Math.ceil(W / SPACING) + 2;
            const rows = Math.ceil(H / SPACING) + 2;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    pts.push({
                        ox: c * SPACING,
                        oy: r * SPACING,
                        x: c * SPACING,
                        y: r * SPACING,
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        }

        function step() {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);
            const cols = Math.ceil(W / SPACING) + 2;

            const tx0 = active ? mX : -10000;
            const ty0 = active ? mY : -10000;

            pts.forEach((p) => {
                const dx = tx0 - p.ox;
                const dy = ty0 - p.oy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = Math.max(0, 1 - dist / RADIUS) * STRENGTH;
                const d = dist || 1;
                const tx = p.ox + (dx / d) * force;
                const ty = p.oy + (dy / d) * force;
                p.vx += (tx - p.x) * 0.09;
                p.vy += (ty - p.y) * 0.09;
                p.vx *= 0.8;
                p.vy *= 0.8;
                p.x += p.vx;
                p.y += p.vy;
            });

            ctx.strokeStyle = 'rgba(45,106,79,0.16)';
            ctx.lineWidth = 0.75;

            pts.forEach((p, i) => {
                if (i % cols < cols - 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
                    ctx.stroke();
                }
                const ni = i + cols;
                if (ni < pts.length) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(pts[ni].x, pts[ni].y);
                    ctx.stroke();
                }
            });

            ctx.fillStyle = 'rgba(45,106,79,0.45)';
            pts.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // True once the grid has settled back to rest with the pointer away.
        // Lets the loop stop rather than redraw a static frame forever.
        function isSettled() {
            if (active) return false;
            return pts.every(
                (p) =>
                    Math.abs(p.x - p.ox) < 0.06 &&
                    Math.abs(p.y - p.oy) < 0.06 &&
                    Math.abs(p.vx) < 0.06 &&
                    Math.abs(p.vy) < 0.06
            );
        }

        function loop() {
            step();
            if (running && !isSettled()) {
                rafId = requestAnimationFrame(loop);
            } else {
                running = false;
            }
        }

        function start() {
            if (reduceMotion || running) return;
            running = true;
            rafId = requestAnimationFrame(loop);
        }

        function stop() {
            running = false;
            cancelAnimationFrame(rafId);
        }

        let repaintId = 0;
        function repaintOnce() {
            cancelAnimationFrame(repaintId);
            repaintId = requestAnimationFrame(step);
        }

        const setPointer = (clientX: number, clientY: number) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mX = clientX - rect.left;
            mY = clientY - rect.top;
            active = true;
            start();
        };

        const handlePointerMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
        const handlePointerDown = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
        const handlePointerLeave = () => {
            active = false;
        };

        const hero = document.getElementById('hero');
        hero?.addEventListener('pointermove', handlePointerMove);
        hero?.addEventListener('pointerdown', handlePointerDown);
        hero?.addEventListener('pointerleave', handlePointerLeave);
        hero?.addEventListener('pointercancel', handlePointerLeave);

        // Observe the canvas box rather than the window: the hero is sized by its
        // content, so its height can change without a window resize, and a window
        // handler may read a pre-reflow height. The observer fires after layout,
        // so the backing store always matches the element's settled size.
        const resizeObserver = new ResizeObserver(() => {
            resizeMesh();
            if (reduceMotion || !active) repaintOnce();
            else start();
        });
        resizeObserver.observe(canvas);

        // Only burn frames while the hero is actually on screen.
        const visibilityObserver = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) start();
                else stop();
            },
            { threshold: 0 }
        );
        visibilityObserver.observe(canvas);

        resizeMesh();
        step();

        return () => {
            stop();
            cancelAnimationFrame(repaintId);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            hero?.removeEventListener('pointermove', handlePointerMove);
            hero?.removeEventListener('pointerdown', handlePointerDown);
            hero?.removeEventListener('pointerleave', handlePointerLeave);
            hero?.removeEventListener('pointercancel', handlePointerLeave);
        };
    }, []);

    return (
        <div id="hero">
            <canvas id="mesh-canvas" ref={canvasRef}></canvas>
            <div className="hero-inner">
                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    AI Engineering Studio
                </div>
                <h1 className="hero-title">
                    Where <em data-text="intelligence">intelligence</em>
                    <br />
                    meets precision form
                </h1>
                <p className="hero-sub">
                    We build AI powered digital products and premium web experiences, combining
                    engineering rigour with design intelligence that actually moves business.
                </p>
                <div className="hero-btns">
                    <a href="#projects" className="btn-primary">
                        View our work <span>↗</span>
                    </a>
                    <a href="#services" className="btn-ghost">
                        Explore services
                    </a>
                </div>
                <div className="hero-scroll">
                    <div className="scroll-line"></div>
                    Scroll to explore
                </div>
            </div>
        </div>
    );
}
