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

        let W = 0,
            H = 0;
        let pts: Point[] = [];
        let mX = canvas.offsetWidth / 2,
            mY = canvas.offsetHeight / 2;

        function resizeMesh() {
            if (!canvas) return;
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            initPts();
        }

        function initPts() {
            pts = [];
            const sp = 68;
            const cols = Math.ceil(W / sp) + 2;
            const rows = Math.ceil(H / sp) + 2;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    pts.push({
                        ox: c * sp,
                        oy: r * sp,
                        x: c * sp,
                        y: r * sp,
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mX = e.clientX - rect.left;
            mY = e.clientY - rect.top;
        };

        function drawMesh() {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);
            const sp = 68;
            const cols = Math.ceil(W / sp) + 2;

            pts.forEach((p) => {
                const dx = mX - p.ox,
                    dy = mY - p.oy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = Math.max(0, 1 - dist / 200) * 22;
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

            requestAnimationFrame(drawMesh);
        }

        const hero = document.getElementById('hero');
        hero?.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeMesh);

        resizeMesh();
        drawMesh();

        return () => {
            hero?.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeMesh);
        };
    }, []);

    return (
        <div id="hero">
            <canvas id="mesh-canvas" ref={canvasRef}></canvas>
            <div className="hero-inner">
                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    AI Engineering Studio · Est. 2019
                </div>
                <h1 className="hero-title">
                    Where <em>intelligence</em>
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