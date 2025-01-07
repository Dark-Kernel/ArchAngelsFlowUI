import React from 'react';
import { Loader2 } from 'lucide-react';

function LoadingState({ state, className = '' }) {
  const messages = {
    collecting: "Collecting data...",
    analyzing: "Analyzing patterns...",
    processing: "Processing insights...",
    generating: "Generating report..."
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-6 ${className}`}>
      <div className="relative">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <div className="absolute inset-0 animate-ping opacity-50 rounded-full bg-primary/20" />
      </div>
      <div className="flex flex-col items-center text-center space-y-2">
        <p className="text-lg font-medium text-primary">{messages[state]}</p>
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
              style={{ animationDelay: `${i * 2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
