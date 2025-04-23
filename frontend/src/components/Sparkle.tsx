import { useEffect } from 'react';

const Sparkle = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const size = 8 + Math.random() * 8;
        const angle = Math.random() * 360;
        const distance = 20 + Math.random() * 15;

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkle.style.setProperty('--angle', `${angle}deg`);
        sparkle.style.setProperty('--distance', `${distance}px`);

        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 800);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default Sparkle;
