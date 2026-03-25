import { useEffect, useRef } from "react";

export default function ResearchNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Research nodes with academic colors
    const nodes = [
      { x: 150, y: 100, color: "#6366f1", label: "Photonics", size: 8 },
      { x: 350, y: 80, color: "#f97316", label: "Chemistry", size: 7 },
      { x: 550, y: 120, color: "#22c55e", label: "Forestry", size: 8 },
      { x: 250, y: 250, color: "#a855f7", label: "XR Tech", size: 7 },
      { x: 450, y: 280, color: "#06b6d4", label: "Resources", size: 8 },
      { x: 350, y: 180, color: "#ec4899", label: "Collaboration", size: 9 },
    ];

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Draw connections between nodes
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only draw lines between nearby nodes
          if (distance < 250) {
            const opacity = 0.15 * (1 - distance / 250);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and animate nodes
      nodes.forEach((node, index) => {
        // Floating animation
        const float = Math.sin(time + index) * 15;
        const pulse = Math.sin(time * 2 + index) * 2;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y + float,
          0,
          node.x,
          node.y + float,
          node.size * 3
        );
        gradient.addColorStop(0, `${node.color}40`);
        gradient.addColorStop(1, `${node.color}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y + float, node.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y + float, node.size + pulse, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer ring
        ctx.strokeStyle = `${node.color}80`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y + float, node.size + pulse + 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw floating particles
      ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
      for (let i = 0; i < 3; i++) {
        const px = 200 + Math.sin(time * 0.5 + i) * 150;
        const py = 150 + Math.cos(time * 0.7 + i) * 100;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50/50 to-blue-50/30 border border-accent/10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
