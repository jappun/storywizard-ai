// the sparkle effect is adapted from this vanilla js codepen:
// https://codepen.io/sarahwfox/pen/pNrYGb
import { useEffect } from 'react';

const NUM_SPARKLES = 50;

const Sparkle = () => {
  useEffect(() => {
    const sparkles: HTMLDivElement[] = [];
    const velocities: number[] = [];

    let mouseX = 0;
    let mouseY = 0;
    let prevX = 0;
    let prevY = 0;

    for (let i = 0; i < NUM_SPARKLES; i++) {
      const div = document.createElement('div');
      div.className = 'sparkle';
      div.style.visibility = 'hidden';
      div.style.position = 'fixed';
      div.style.width = '4px';
      div.style.height = '4px';
      div.style.borderRadius = '9999px';
      div.style.pointerEvents = 'none';
      div.style.zIndex = '9999';
      document.body.appendChild(div);
      sparkles.push(div);
      velocities.push(0);
    }

    const update = () => {
      if (Math.abs(mouseX - prevX) > 1 || Math.abs(mouseY - prevY) > 1) {
        prevX = mouseX;
        prevY = mouseY;

        for (let i = 0; i < NUM_SPARKLES; i++) {
          if (velocities[i] === 0) {
            const sparkle = sparkles[i];
            sparkle.style.left = `${mouseX}px`;
            sparkle.style.top = `${mouseY}px`;
            sparkle.style.background = randomColor();
            sparkle.style.visibility = 'visible';
            sparkle.style.opacity = '1';
            velocities[i] = 30;
            break;
          }
        }
      }

      for (let i = 0; i < NUM_SPARKLES; i++) {
        if (velocities[i] > 0) {
          velocities[i]--;
          const sparkle = sparkles[i];
          const top = parseFloat(sparkle.style.top || '0');
          const left = parseFloat(sparkle.style.left || '0');
          sparkle.style.top = `${top + 1 + Math.random() * 2}px`;
          sparkle.style.left = `${left + (Math.random() * 4 - 2)}px`;

          if (velocities[i] === 0) {
            sparkle.style.opacity = '0';
            // Let CSS handle fading, then hide after delay
            setTimeout(() => {
              sparkle.style.visibility = 'hidden';
            }, 400);
          }
        }
      }

      requestAnimationFrame(update);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    update(); // start animation loop

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      sparkles.forEach(s => s.remove());
    };
  }, []);

  return null;
};

function randomColor() {
  const colors = ['#FCD34D', '#A855F7', '#34D399', '#60A5FA', '#F472B6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default Sparkle;
