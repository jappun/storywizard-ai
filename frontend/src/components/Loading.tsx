import { useEffect, useState } from "react";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";

interface Props {
  onFinish: () => void;
}

const Loading = ({ onFinish }: Props) => {
  const [currentImage, setCurrentImage] = useState(Left);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev === Left ? Right : Left));
      count++;
      if (count >= 8) {
        clearInterval(interval);
        onFinish();
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-64  bg-yellow-100">
      <img src={currentImage} alt="Loading..." className="w-60 h-60 object-contain mt-12"/>
      <p className="text-purple-600 text-xl mt-4">Now for some magic...🪄✨</p>
    </div>
  );
};

export default Loading;
