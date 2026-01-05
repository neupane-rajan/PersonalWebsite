import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let columns: number;
    let drops: number[] = [];
    const fontSize = 14;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Scale canvas for high-DPI displays
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Re-calculate columns based on new width
      columns = Math.floor(rect.width / fontSize);
      // Preserve existing drops or re-initialize
      const newDrops = [];
      for (let i = 0; i < columns; i++) {
        newDrops[i] = drops[i] ?? Math.random() * -100;
      }
      drops = newDrops;
    };

    const draw = () => {
      // Background fade effect
      ctx.fillStyle = 'rgba(30, 30, 46, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#a6e3a1'; // Catppuccin Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Control frame rate manually within requestAnimationFrame
    let lastTime = 0;
    const fps = 20; // Slower feels more "Matrix-like"
    const interval = 1000 / fps;

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      if (deltaTime > interval) {
        draw();
        lastTime = time - (deltaTime % interval);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setupCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block', background: '#1e1e2e' }}
    />
  );
}