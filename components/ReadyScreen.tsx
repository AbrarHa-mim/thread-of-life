'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReadyScreenProps {
  onShow: () => void;
}

export default function ReadyScreen({ onShow }: ReadyScreenProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <h1 className="font-serif text-4xl md:text-6xl mb-6 text-center">
        {t('আপনার ভবিষ্যৎ দেখতে প্রস্তুত?', 'Ready to see your future?')}
      </h1>

      <p className="font-mono text-sm text-[var(--muted)] mb-12">
        {t('আপনার ফাইল খোলা হয়েছে।', 'Your file has been opened.')}
      </p>

      <button
        onClick={onShow}
        className="font-mono text-lg px-8 py-3 border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
      >
        [ {t('দেখান', 'Show me')} ]
      </button>
    </motion.div>
  );
}
