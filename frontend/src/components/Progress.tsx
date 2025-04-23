import { motion } from 'framer-motion';

interface ProgressProps {
  currentPage: number;
  totalPages: number;
}

export const Progress = ({ currentPage, totalPages }: ProgressProps) => {
  const progress = (currentPage / totalPages) * 100;

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        className="h-full bg-purple-500"
      />
    </div>
  );
};