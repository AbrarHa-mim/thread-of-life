'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThreadData, ThreadEvent } from '@/types';

interface ThreadVisualizationProps {
  data: ThreadData;
}

export default function ThreadVisualization({ data }: ThreadVisualizationProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<ThreadEvent | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: data.events[data.events.length - 1].year - currentYear + 1 },
    (_, i) => currentYear + i
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--paper)] py-20 px-6 relative">
      {/* Warning stamp - top */}
      <motion.div
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 0.85, rotate: -8 }}
        transition={{ delay: 0.5 }}
        className="fixed top-12 right-12 font-mono text-xs border-4 border-[var(--accent)] text-[var(--accent)] p-4 bg-[var(--paper)] z-50"
        style={{ borderStyle: 'double' }}
      >
        <div className="text-center space-y-1">
          <div className="font-bold">⚠ {t('ভাগ্য বোর্ড সতর্কতা', 'FATE BOARD WARNING')}</div>
          <div>{data.warning}</div>
          <div className="text-[10px]">{t('পছন্দ পথ পরিবর্তন করে।', 'Choices alter the path.')}</div>
          <div className="text-[10px]">{t('৬ মাসে পুনরায় পরামর্শ নিন।', 'Re-consult in 6 months.')}</div>
        </div>
      </motion.div>

      {/* Reference number - top left */}
      <div className="fixed top-12 left-12 font-mono text-xs text-[var(--muted)] space-y-1 z-50">
        <div>{data.reference}</div>
        <div>{t('গোপনীয়', 'CONFIDENTIAL')}</div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline years and events */}
        <div className="space-y-32">
          {years.reverse().map((year, yearIndex) => {
            const yearEvents = data.events.filter(e => e.year === year);
            const isKnot = data.threadStyle.knotsAt.includes(year);
            const isLoop = data.threadStyle.loopsAt.includes(year);
            const isUncertain = data.threadStyle.uncertainAt.includes(year);
            const footnote = data.footnotes.find(f => Math.floor(f.year) === year);
            const dice = data.fateDice.find(d => d.year === year);

            return (
              <motion.div
                key={year}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                className="relative"
              >
                {/* Year label */}
                <div className="absolute left-0 font-mono text-sm text-[var(--muted)]">
                  {year}
                </div>

                {/* Central thread */}
                <div className="absolute left-1/2 -translate-x-1/2 w-1">
                  <svg className="w-full h-32" viewBox="0 0 20 128">
                    {isKnot ? (
                      <path
                        d="M10 0 Q5 32 10 64 Q15 96 10 128"
                        fill="none"
                        stroke="var(--ink)"
                        strokeWidth="2"
                      />
                    ) : isLoop ? (
                      <path
                        d="M10 0 Q20 32 15 64 Q10 96 10 128"
                        fill="none"
                        stroke="var(--ink)"
                        strokeWidth="2"
                      />
                    ) : (
                      <line
                        x1="10"
                        y1="0"
                        x2="10"
                        y2="128"
                        stroke="var(--ink)"
                        strokeWidth={isUncertain ? "1" : "2"}
                        strokeDasharray={isUncertain ? "4 4" : "0"}
                      />
                    )}
                  </svg>
                </div>

                {/* Events */}
                {yearEvents.map((event, eventIndex) => (
                  <motion.div
                    key={eventIndex}
                    initial={{ opacity: 0, x: event.side === 'left' ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`absolute ${
                      event.side === 'left'
                        ? 'right-1/2 pr-12 text-right'
                        : 'left-1/2 pl-12 text-left'
                    } top-1/2 -translate-y-1/2 w-1/2`}
                  >
                    {/* Event dot */}
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="absolute top-1/2 -translate-y-1/2 group"
                      style={{
                        [event.side === 'left' ? 'right' : 'left']: '-4px',
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[var(--ink)] border-2 border-[var(--paper)] group-hover:scale-150 transition-transform" />
                    </button>

                    {/* Event content */}
                    <div className="cursor-pointer" onClick={() => setSelectedEvent(event)}>
                      <h3 className="font-serif text-xl mb-1">{event.title}</h3>
                      <p className="font-mono text-xs text-[var(--muted)]">
                        {event.description.substring(0, 60)}
                        {event.description.length > 60 ? '...' : ''}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Footnote */}
                {footnote && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 0 }}
                    whileInView={{ opacity: 1, rotate: Math.random() * 6 - 3 }}
                    viewport={{ once: true }}
                    className="absolute right-0 top-20 w-48 font-mono text-[10px] text-[var(--muted)] leading-relaxed"
                  >
                    {footnote.year.toFixed(1)} — {footnote.text}
                  </motion.div>
                )}

                {/* Fate dice */}
                {dice && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="absolute left-0 top-24 font-mono text-xs text-[var(--muted)] group cursor-help"
                  >
                    🎲 {dice.roll}/10
                    <div className="absolute left-0 top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] whitespace-nowrap">
                      {t('এই বছরের ভাইব। শুভকামনা।', "This year's vibe. Best of luck.")}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* Present - pulsing dot at bottom */}
          <motion.div className="relative pt-20 pb-40">
            <div className="absolute left-0 font-mono text-sm text-[var(--muted)]">
              {currentYear}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-4 h-4 rounded-full bg-[var(--accent)]"
              />
            </div>
            <div className="text-center font-serif text-2xl pt-12">
              {t('আপনি, এখন', 'You, now')}
            </div>
          </motion.div>
        </div>

        {/* Rejected futures */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 space-y-4"
        >
          <h3 className="font-mono text-sm text-[var(--muted)] mb-6">
            {t('প্রত্যাখ্যাত টাইমলাইন', 'REJECTED TIMELINES')}
          </h3>
          {data.rejectedFutures.map((rejected, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-[var(--ghost)] p-4 text-[var(--ghost)]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-serif text-lg mb-1">
                    [ {t('প্রত্যাখ্যাত', 'Rejected')}: {rejected.title} ✕ ]
                  </div>
                  <div className="font-mono text-xs">{rejected.reason}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Event popup */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--paper)] border-2 border-[var(--ink)] p-8 max-w-lg w-full"
          >
            <div className="font-mono text-xs text-[var(--muted)] mb-4">
              {selectedEvent.year} · {selectedEvent.side.toUpperCase()} SIDE
            </div>

            <h2 className="font-serif text-3xl mb-6">{selectedEvent.title}</h2>

            <p className="font-sans text-base mb-6 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="border-l-2 border-[var(--accent)] pl-4 mb-8">
              <p className="font-mono text-sm text-[var(--muted)]">
                {selectedEvent.twist}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="font-mono text-sm border border-[var(--ink)] px-4 py-2 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            >
              [ {t('বন্ধ করুন', 'close')} ]
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Export button */}
      <button
        onClick={() => alert(t('এক্সপোর্ট ফিচার শীঘ্রই আসছে', 'Export feature coming in Phase 4'))}
        className="fixed bottom-8 right-8 font-mono text-sm border-2 border-[var(--ink)] px-6 py-3 bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors z-50"
      >
        [ {t('পোস্টার এক্সপোর্ট করুন', 'Export Poster')} ↓ ]
      </button>
    </div>
  );
}
