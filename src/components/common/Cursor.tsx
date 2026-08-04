import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: `${pos.x - 12}px`,
          top: `${pos.y - 12}px`,
          transition: "all 0.1s ease-out",
        }}
      />
      {/* Glow effect */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] blur-md opacity-30 bg-cyan-400 mix-blend-screen"
        style={{
          left: `${pos.x - 16}px`,
          top: `${pos.y - 16}px`,
        }}
      />
    </>
  );
}
