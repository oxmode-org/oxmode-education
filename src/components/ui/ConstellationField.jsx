import React, { useEffect, useRef } from 'react';

export default function ConstellationField({
  color = '#2EFCFF',
  goldColor = '#E6C879',
  density = 1,
  speed = 1,
  linkDistance = 160,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current || canvas?.parentElement;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let animationFrameId;
    let nodes = [];
    const pointer = { x: -2000, y: -2000 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const baseMaxNodes = window.innerWidth < 768 ? 40 : 85;
    const maxNodes = Math.max(12, Math.round(baseMaxNodes * density));
    const effectiveLink = Math.round(linkDistance);

    function resize() {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3 * speed,
          vy: (Math.random() - 0.5) * 0.3 * speed,
          radius: Math.random() * 2.2 + 1.6,
          isGold: Math.random() > 0.65,
        });
      }
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (nodes.length === 0) initNodes();
    });
    ro.observe(container);

    resize();
    initNodes();

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function onPointerLeave() {
      pointer.x = -2000;
      pointer.y = -2000;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    function dist(a, b) {
      return Math.hypot(a.x - b.x, a.y - b.y);
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';

      // 1. Draw Links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = dist(nodes[i], nodes[j]);
          if (d < effectiveLink) {
            const alpha = 0.15 + (1 - d / effectiveLink) * 0.45;
            ctx.strokeStyle = nodes[i].isGold || nodes[j].isGold ? goldColor : color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Nodes
      const now = Date.now();
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Pointer gravity
        const pd = dist(node, pointer);
        if (pd < 220) {
          node.x -= (node.x - pointer.x) * 0.005;
          node.y -= (node.y - pointer.y) * 0.005;
        }

        const pulse = 0.78 + Math.sin(now * 0.001 + node.x) * 0.22;
        const nodeColor = node.isGold ? goldColor : color;

        // Soft halo
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = pulse * 0.25;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = pulse;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      animate();
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [color, goldColor, density, speed, linkDistance]);

  return (
    <div
      ref={containerRef}
      className={`constellation-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
