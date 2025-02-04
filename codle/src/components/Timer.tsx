// components/Timer.tsx
import { useEffect, useState } from 'react';

export default function Timer({ isActive }: { isActive: boolean }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="text-2xl font-medium text-gray-700">
      {(time / 1000).toFixed(1)}s
    </div>
  );
}
