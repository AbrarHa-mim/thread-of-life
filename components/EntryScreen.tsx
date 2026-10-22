'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="w-screen h-screen bg-[var(--paper)] flex items-center justify-center relative">
      {/* Top left corner */}
      <div className="absolute top-8 left-8 font-mono text-[11px] text-[var(--muted)] leading-tight">
        BPF/2026/____<br />
        CONFIDENTIAL
      </div>

      {/* Language toggle - top right */}
      <div className="absolute top-8 right-8 flex gap-2">
        <button
          onClick={() => setLanguage('bn')}
          className={`font-mono text-xs px-2 py-1 border border-[var(--ink)] ${
            language === 'bn' ? 'bg-[var(--ink)] text-[var(--paper)]' : ''
          }`}
        >
          বাংলা
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`font-mono text-xs px-2 py-1 border border-[var(--ink)] ${
            language === 'en' ? 'bg-[var(--ink)] text-[var(--paper)]' : ''
          }`}
        >
          EN
        </button>
      </div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center px-8"
      >
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight max-w-4xl mx-auto">
          {t(
            'আপনি কি আপনার ভবিষ্যৎকে এক্সেপ্ট করার জন্য প্রস্তুত?',
            'Are you ready to accept your future?'
          )}
        </h1>

        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          {t('ব্যুরো অফ পার্সোনাল ফিউচারস · EST. 2026', 'BUREAU OF PERSONAL FUTURES · EST. 2026')}
        </p>

        <button
          onClick={onEnter}
          className="font-mono text-base border-b-2 border-[var(--ink)] hover:border-[var(--accent)] transition-colors pb-1"
        >
          [ {t('প্রবেশ করুন', 'Enter')} ]
        </button>
      </motion.div>

      {/* Bottom privacy */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[var(--muted)]">
        {t('আমরা আপনার ডেটা সংরক্ষণ করি না', "We don't save your data")}
      </div>
    </div>
  );
}
