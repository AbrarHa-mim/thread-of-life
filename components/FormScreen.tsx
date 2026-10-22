'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormData } from '@/types';

interface FormScreenProps {
  onComplete: (data: FormData) => void;
}

const questions = [
  {
    id: 'name',
    bn: 'আপনার নাম?',
    en: 'Your name?',
    type: 'text',
  },
  {
    id: 'age',
    bn: 'আপনার বয়স?',
    en: 'Your age?',
    type: 'number',
  },
  {
    id: 'gender',
    bn: 'আপনার জেন্ডার?',
    en: 'Your gender?',
    type: 'select',
    options: [
      { value: 'M', bn: 'পুরুষ', en: 'Male' },
      { value: 'F', bn: 'নারী', en: 'Female' },
      { value: 'Other', bn: 'অন্যান্য', en: 'Other' },
    ],
  },
  {
    id: 'hobby',
    bn: 'আপনার শখ?',
    en: 'Your hobby?',
    type: 'text',
  },
  {
    id: 'busReaction',
    bn: 'বাসে কেউ সিট নিয়ে নিলে আপনি কী করেন?',
    en: 'What do you do when someone takes your bus seat?',
    type: 'select',
    options: [
      { value: 'fight', bn: 'যুদ্ধ করি', en: 'Fight for it' },
      { value: 'sigh', bn: 'দীর্ঘশ্বাস ফেলি', en: 'Sigh and stand' },
      { value: 'smile', bn: 'হেসে দাঁড়িয়ে থাকি', en: 'Smile and stand' },
      { value: 'leave', bn: 'বাস থেকে নামি', en: 'Leave the bus' },
    ],
  },
  {
    id: 'paymentFrequency',
    bn: '"Sorry, payment হয়ে গেছে" — দিনে কতবার বলেন?',
    en: '"Sorry, payment done" — how many times per day?',
    type: 'slider',
    min: 0,
    max: 10,
  },
];

export default function FormScreen({ onComplete }: FormScreenProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentStep];
  const currentValue = formData[currentQuestion.id as keyof FormData];

  const handleNext = () => {
    if (!currentValue && currentValue !== 0) return;

    if (currentStep === questions.length - 1) {
      onComplete(formData as FormData);
    } else {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (value: string | number) => {
    setFormData({ ...formData, [currentQuestion.id]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-start px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-2xl">
        {/* Step indicator */}
        <motion.div
          key={`step-${currentStep}`}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs text-[var(--muted)] mb-8 tracking-wider"
        >
          STEP {String(currentStep + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Question */}
            <h2 className="font-serif text-3xl md:text-5xl mb-12 leading-tight">
              {t(currentQuestion.bn, currentQuestion.en)}
            </h2>

            {/* Input */}
            <div className="mb-16">
              {currentQuestion.type === 'text' && (
                <input
                  type="text"
                  value={(currentValue as string) || ''}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  autoFocus
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--ink)] focus:border-[var(--accent)] outline-none text-2xl pb-2 font-sans"
                  style={{ caretColor: 'var(--accent)' }}
                />
              )}

              {currentQuestion.type === 'number' && (
                <input
                  type="number"
                  value={(currentValue as number) || ''}
                  onChange={(e) => handleChange(Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  autoFocus
                  min="1"
                  max="120"
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--ink)] focus:border-[var(--accent)] outline-none text-2xl pb-2 font-mono"
                  style={{ caretColor: 'var(--accent)' }}
                />
              )}

              {currentQuestion.type === 'select' && (
                <div className="space-y-4">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleChange(option.value)}
                      className={`block w-full text-left px-6 py-4 border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors ${
                        currentValue === option.value ? 'bg-[var(--ink)] text-[var(--paper)]' : ''
                      }`}
                    >
                      <span className="font-sans text-lg">
                        {t(option.bn, option.en)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'slider' && (
                <div className="space-y-6">
                  <input
                    type="range"
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    value={(currentValue as number) ?? currentQuestion.min}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    className="w-full h-1 bg-[var(--divider)] appearance-none cursor-pointer slider"
                    style={{
                      accentColor: 'var(--accent)',
                    }}
                  />
                  <div className="font-mono text-4xl text-center text-[var(--accent)]">
                    {(currentValue as number) ?? currentQuestion.min}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="font-mono text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                >
                  ← {t('পিছনে', 'Back')}
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={!currentValue && currentValue !== 0}
                className="font-mono text-lg border-b-2 border-[var(--ink)] hover:border-[var(--accent)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:border-[var(--muted)]"
              >
                [ {currentStep === questions.length - 1 ? t('শেষ', 'Done') : t('পরবর্তী', 'Next')} → ]
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[var(--divider)]">
        <motion.div
          className="h-full bg-[var(--accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--accent);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: var(--accent);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
