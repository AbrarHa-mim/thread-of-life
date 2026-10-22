'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative px-6"
    >
      {/* Language toggle - top right */}
      <div className="absolute top-8 right-8 flex gap-2 font-mono text-sm">
        <button
          onClick={() => setLanguage('bn')}
          className={`px-3 py-1 border border-[var(--ink)] ${
            language === 'bn' ? 'bg-[var(--ink)] text-[var(--paper)]' : ''
          }`}
        >
          বাংলা
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 border border-[var(--ink)] ${
            language === 'en' ? 'bg-[var(--ink)] text-[var(--paper)]' : ''
          }`}
        >
          EN
        </button>
      </div>

      {/* Corner reference marks */}
      <div className="absolute top-8 left-8 font-mono text-xs text-[var(--muted)]">
        BPF/2026/____
      </div>
      <div className="absolute top-8 right-8 font-mono text-xs text-[var(--muted)] mr-32">
        BPF/2026/____
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-xs text-[var(--muted)]">
        BPF/2026/____
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-[var(--muted)]">
        BPF/2026/____
      </div>

      {/* Main content */}
      <div className="max-w-2xl text-center relative z-10">
        {/* Heartbeat background pulse */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          }}
        />

        <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
          {t(
            'আপনি কি আপনার ভবিষ্যৎকে এক্সেপ্ট করার জন্য প্রস্তুত?',
            'Are you ready to accept your future?'
          )}
        </h1>

        <p className="font-mono text-sm md:text-base text-[var(--muted)] mb-12 tracking-wider">
          {t('ব্যুরো অফ পার্সোনাল ফিউচারস · EST. 2026', 'BUREAU OF PERSONAL FUTURES · EST. 2026')}
        </p>

        <div className="relative inline-block">
          <button
            onClick={onEnter}
            className="font-mono text-lg border-b-2 border-[var(--ink)] hover:border-[var(--accent)] transition-colors pb-1 group"
          >
            [ {t('প্রবেশ করুন', 'Enter')} ]
          </button>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-8 left-0 right-0 text-xs font-mono text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ⚠ non-binding
          </motion.p>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="absolute bottom-12 font-mono text-xs text-[var(--muted)]">
        {t('আমরা আপনার ডেটা সংরক্ষণ করি না', "We don't save your data")}
      </div>
    </motion.div>
  );
}
