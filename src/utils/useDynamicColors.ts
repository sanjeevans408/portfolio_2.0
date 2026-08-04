import { useEffect } from 'react';

export const useDynamicColors = () => {
  useEffect(() => {
    let hue = 182; // Start with the original cyan hue
    let animationFrameId: number;

    const shiftColors = () => {
      hue = (hue + 0.1) % 360; // Slowly shift hue
      
      // Update the CSS variables globally on the document root
      document.documentElement.style.setProperty('--color-neon', `hsl(${hue}, 100%, 50%)`);
      document.documentElement.style.setProperty('--color-accent', `hsl(${(hue + 20) % 360}, 90%, 55%)`); // slightly offset hue for accent
      
      animationFrameId = requestAnimationFrame(shiftColors);
    };

    animationFrameId = requestAnimationFrame(shiftColors);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
};
