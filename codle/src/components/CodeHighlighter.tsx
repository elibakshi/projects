import { useEffect, useState } from 'react';

interface CodeHighlighterProps {
  sampleCode: string;
  onComplete: (time: number) => void;
}

export default function CodeHighlighter({ sampleCode, onComplete }: CodeHighlighterProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [charStatus, setCharStatus] = useState<Array<'correct' | 'incorrect' | 'untyped'>>(
    new Array(sampleCode.length).fill('untyped')
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isTyping && e.key.length === 1) {
        setIsTyping(true);
        setStartTime(Date.now());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTyping]);

  useEffect(() => {
    if (userInput === sampleCode) {
      const endTime = Date.now();
      onComplete((endTime - (startTime || endTime)) / 1000);
      setIsTyping(false);
    }
    
    const newStatus = sampleCode.split('').map((char, index) => {
      if (index >= userInput.length) return 'untyped';
      return userInput[index] === char ? 'correct' : 'incorrect';
    });
    
    setCharStatus(newStatus);
  }, [userInput, sampleCode, startTime, onComplete]);

  return (
    <div className="relative font-mono text-lg">
      <pre className="text-gray-400 whitespace-pre-wrap">
        {sampleCode.split('').map((char, index) => (
          <span
            key={index}
            className={`
              ${charStatus[index] === 'correct' ? 'text-black' : ''}
              ${charStatus[index] === 'incorrect' ? 'text-red-500' : ''}
            `}
          >
            {char}
          </span>
        ))}
      </pre>
      <textarea
        className="absolute inset-0 opacity-0 cursor-default"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onPaste={(e) => e.preventDefault()}
        spellCheck="false"
      />
    </div>
  );
}
