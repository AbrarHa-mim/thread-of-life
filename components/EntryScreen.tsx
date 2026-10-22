'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#F2EDE4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Language toggle - top right */}
      <div style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
      }}>
        <button
          onClick={() => setLanguage('bn')}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            padding: '6px 12px',
            border: '1px solid #1A1A1A',
            background: language === 'bn' ? '#1A1A1A' : 'transparent',
            color: language === 'bn' ? '#F2EDE4' : '#1A1A1A',
            cursor: 'pointer',
          }}
        >
          বাংলা
        </button>
        <button
          onClick={() => setLanguage('en')}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            padding: '6px 12px',
            border: '1px solid #1A1A1A',
            background: language === 'en' ? '#1A1A1A' : 'transparent',
            color: language === 'en' ? '#F2EDE4' : '#1A1A1A',
            cursor: 'pointer',
          }}
        >
          EN
        </button>
      </div>

      {/* Top left corner */}
      <div style={{
        position: 'absolute',
        top: '32px',
        left: '32px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        color: '#8B8378',
        lineHeight: '1.5',
      }}>
        BPF/2026/____<br/>
        CONFIDENTIAL
      </div>

      {/* Center content */}
      <div style={{ textAlign: 'center', maxWidth: '900px', padding: '0 32px' }}>
        <h1 style={{
          fontFamily: language === 'bn' ? 'Noto Serif Bengali, serif' : 'Instrument Serif, serif',
          fontSize: '56px',
          lineHeight: '1.3',
          marginBottom: '24px',
          color: '#1A1A1A',
          fontWeight: language === 'bn' ? 600 : 400,
        }}>
          {t(
            'আপনি কি আপনার ভবিষ্যৎকে এক্সেপ্ট করার জন্য প্রস্তুত?',
            'Are you ready to accept your future?'
          )}
        </h1>

        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#8B8378',
          marginBottom: '48px',
        }}>
          {t('ব্যুরো অফ পার্সোনাল ফিউচারস · EST. 2026', 'BUREAU OF PERSONAL FUTURES · EST. 2026')}
        </p>

        <button
          onClick={onEnter}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '16px',
            color: '#1A1A1A',
            background: 'none',
            border: 'none',
            borderBottom: '2px solid #1A1A1A',
            cursor: 'pointer',
            padding: '4px 0',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#C4422D'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1A1A1A'}
        >
          [ {t('প্রবেশ করুন', 'Enter')} ]
        </button>
      </div>

      {/* Bottom privacy */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        color: '#8B8378',
      }}>
        {t('আমরা আপনার ডেটা সংরক্ষণ করি না', "We don't save your data")}
      </div>
    </div>
  );
}
