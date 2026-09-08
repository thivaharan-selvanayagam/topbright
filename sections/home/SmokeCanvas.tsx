"use client";

import { useEffect, useRef } from "react";

export default function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      growthRate: number;
      maxLife: number;
      life: number;
      color: string;
      rotation: number;
      spin: number;
      scaleY: number;

      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y + (Math.random() - 0.5) * 12;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.2 + 0.4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.4;

        this.radius = Math.random() * 14 + 6;
        this.growthRate = Math.random() * 0.7 + 0.3;
        this.maxLife = Math.random() * 30 + 15;
        this.life = this.maxLife;
        this.scaleY = Math.random() * 0.4 + 0.7;
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.08;

        const colorPalette = [
          "138, 0, 194",   // #8a00c2 Purple
          "240, 130, 43",  // #f0822b Orange/Yellow
          "186, 51, 160",  // Magenta-Purple Tint
          "215, 110, 25"   // Rich Gold/Orange
        ];
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius += this.growthRate;
        this.rotation += this.spin;
        this.life -= 1;
      }

      draw(context: CanvasRenderingContext2D) {
        const alpha = Math.max(0, (this.life / this.maxLife) * 0.25);
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        context.beginPath();
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        gradient.addColorStop(0, `rgba(${this.color}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${this.color}, ${alpha * 0.35})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        context.fillStyle = gradient;
        context.scale(1, this.scaleY);
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const spawnCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < spawnCount; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "multiply";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full opacity-70"
    />
  );
}