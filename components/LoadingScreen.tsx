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
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(finalTimer);
    }
  }, [currentLine, steps.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: '#ffffff' }}
      animate={{ opacity: 1, backgroundColor: 'var(--paper)' }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-start justify-center px-8 md:px-16 lg:px-24"
    >
      <div className="font-mono text-sm md:text-base space-y-3 max-w-2xl">
        {steps.slice(0, currentLine).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={index === steps.length - 1 ? 'text-[var(--accent)]' : ''}
          >
            {line}
          </motion.div>
        ))}

        {currentLine < steps.length && (
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-[var(--ink)] ml-1"
          />
        )}
      </div>
    </motion.div>
  );
}
