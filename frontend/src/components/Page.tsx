import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface PageProps {
  title: string;
  description: string;
  wizardDialogue: string;
  children: React.ReactNode;
}

export const Page = ({ title, description, wizardDialogue, children }: PageProps) => {
  useEffect(() => {
    const createSparkles = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('button') || target.closest('button')?.hasAttribute('disabled')) return;
      
      for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        document.body.appendChild(sparkle);
      }
    };

    document.addEventListener('click', createSparkles);
    return () => document.removeEventListener('click', createSparkles);
  }, []);

  return (
    <div className="p-8 relative">
      <div>
        {children}

        <div className="mt-8 bg-blue-100 p-6 rounded-lg">
          <p className="text-blue-800 text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};