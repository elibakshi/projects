// pages/index.tsx
import { useState } from 'react';
import CodeHighlighter from '../components/CodeHighlighter';
import Timer from '../components/Timer';

const sampleCode = `function greet() {
  console.log("Hello, World!");
}`;

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [time, setTime] = useState(0);

  const handleComplete = (completedTime: number) => {
    setTime(completedTime);
    // TODO: Submit to leaderboard
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Code Racer
        </h1>
        
        <div className="border-2 border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <Timer isActive={isTyping} />
            <div className="text-sm text-gray-500">
              {isTyping ? 'Typing...' : 'Start typing to begin'}
            </div>
          </div>
          
          <CodeHighlighter
            sampleCode={sampleCode}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}
