'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = {
  bn: [
    '> ফাইল BPF/2026/4471 খোলা হচ্ছে...',
    '> কর্মফল রেকর্ড খোঁজা হচ্ছে...',
    '> ভাগ্য বোর্ডের সাথে মিলাচ্ছি...',
    '> সতর্কতা: ৩টি প্রত্যাখ্যাত টাইমলাইন পাওয়া গেছে।',
    '> প্রস্তুত।',
  ],
  en: [
    '> Opening file BPF/2026/4471...',
    '> Retrieving karma records...',
    '> Cross-referencing with fate board...',
    '> Warning: 3 rejected timelines found.',
    '> Ready.',
  ],
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { language } = useLanguage();
  const [currentLine, setCurrentLine] = useState(0);
  const steps = loadingSteps[language];

  useEffect(() => {
    if (currentLine < steps.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(onComplete, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentLine, steps.length, onComplete]);

  return (
    <div className="w-screen h-screen bg-[var(--paper)] flex items-center px-12 md:px-20 lg:px-32">
      <div className="font-mono text-sm space-y-3">
        {steps.slice(0, currentLine).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={index === steps.length - 1 ? 'text-[var(--accent)]' : ''}
          >
            {line}
          </motion.div>
        ))}

        {currentLine < steps.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-[var(--ink)] ml-1"
          />
        )}
      </div>
    </div>
  );
}
