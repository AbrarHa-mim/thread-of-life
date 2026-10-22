'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReadyScreenProps {
  onShow: () => void;
}

export default function ReadyScreen({ onShow }: ReadyScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="w-screen h-screen bg-[var(--paper)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center px-8"
      >
        <h1 className="font-serif text-5xl md:text-6xl mb-6">
          {t('আপনার ভবিষ্যৎ দেখতে প্রস্তুত?', 'Ready to see your future?')}
        </h1>

        <p className="font-mono text-xs text-[var(--muted)] mb-12 uppercase tracking-widest">
          {t('আপনার ফাইল খোলা হয়েছে।', 'Your file has been opened.')}
        </p>

        <button
          onClick={onShow}
          className="font-mono text-base px-8 py-3 border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
        >
          [ {t('দেখান', 'Show me')} ]
        </button>
      </motion.div>
    </div>
  );
}
