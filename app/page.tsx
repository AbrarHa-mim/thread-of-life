'use client';

import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import EntryScreen from '@/components/EntryScreen';
import FormScreen from '@/components/FormScreen';
import ReadyScreen from '@/components/ReadyScreen';
import LoadingScreen from '@/components/LoadingScreen';
import ThreadVisualization from '@/components/ThreadVisualization';
import { FormData } from '@/types';
import { mockThreadData } from '@/data/mockData';

type Screen = 'entry' | 'form' | 'ready' | 'loading' | 'thread';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('entry');
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setCurrentScreen('ready');
  };

  const handleShowThread = () => {
    setCurrentScreen('loading');
  };

  const handleLoadingComplete = () => {
    setCurrentScreen('thread');
  };

  return (
    <LanguageProvider>
      <main style={{ position: 'relative', zIndex: 2 }}>
        {currentScreen === 'entry' && (
          <EntryScreen onEnter={() => setCurrentScreen('form')} />
        )}

        {currentScreen === 'form' && (
          <FormScreen onComplete={handleFormComplete} />
        )}

        {currentScreen === 'ready' && (
          <ReadyScreen onShow={handleShowThread} />
        )}

        {currentScreen === 'loading' && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}

        {currentScreen === 'thread' && (
          <ThreadVisualization data={mockThreadData} />
        )}
      </main>
    </LanguageProvider>
  );
}
