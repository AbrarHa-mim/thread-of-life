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

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: data.events[data.events.length - 1].year - currentYear + 1 },
    (_, i) => currentYear + i
  );

  return (
    <div ref={containerRef} className="relative bg-[var(--paper)] min-h-screen">
      {/* Warning stamp - top right */}
      <motion.div
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 0.85, rotate: -8 }}
        transition={{ delay: 0.5 }}
        className="fixed top-8 right-8 font-mono text-xs border-4 border-[var(--accent)] text-[var(--accent)] p-4 bg-[var(--paper)] z-50 max-w-xs"
        style={{ borderStyle: 'double' }}
      >
        <div className="text-center space-y-1">
          <div className="font-bold">⚠ {t('ভাগ্য বোর্ড সতর্কতা', 'FATE BOARD WARNING')}</div>
          <div className="text-[10px] leading-relaxed">{data.warning}</div>
          <div className="text-[10px]">{t('পছন্দ পথ পরিবর্তন করে।', 'Choices alter the path.')}</div>
        </div>
      </motion.div>

      {/* Reference number - top left */}
      <div className="fixed top-8 left-8 font-mono text-xs text-[var(--muted)] space-y-1 z-50">
        <div>{data.reference}</div>
        <div>{t('গোপনীয়', 'CONFIDENTIAL')}</div>
      </div>

      {/* Main timeline content */}
      <div className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Timeline - bottom to top (reversed) */}
          <div className="relative">
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: yearIndex * 0.05 }}
                  className="relative mb-32"
                >
                  {/* Year label - left side */}
                  <div className="absolute -left-16 top-0 font-mono text-sm text-[var(--muted)] w-12 text-right">
                    {year}
                  </div>

                  {/* Central thread line */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 100">
                      {isKnot ? (
                        <path
                          d="M2 0 Q1 25 2 50 Q3 75 2 100"
                          fill="none"
                          stroke="var(--ink)"
                          strokeWidth="0.5"
                          vectorEffect="non-scaling-stroke"
                        />
                      ) : isLoop ? (
                        <path
                          d="M2 0 Q3.5 25 3 50 Q2.5 75 2 100"
                          fill="none"
                          stroke="var(--ink)"
                          strokeWidth="0.5"
                          vectorEffect="non-scaling-stroke"
                        />
                      ) : (
                        <line
                          x1="2"
                          y1="0"
                          x2="2"
                          y2="100"
                          stroke="var(--ink)"
                          strokeWidth={isUncertain ? "0.3" : "0.5"}
                          strokeDasharray={isUncertain ? "2 2" : "0"}
                          vectorEffect="non-scaling-stroke"
                        />
                      )}
                    </svg>
                  </div>

                  {/* Events */}
                  <div className="relative flex items-center justify-center min-h-[100px]">
                    {yearEvents.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, x: event.side === 'left' ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`absolute ${
                          event.side === 'left'
                            ? 'right-1/2 pr-12 text-right'
                            : 'left-1/2 pl-12 text-left'
                        } w-5/12 group cursor-pointer`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {/* Event dot */}
                        <div
                          className="absolute top-2"
                          style={{
                            [event.side === 'left' ? 'right' : 'left']: '-5px',
                          }}
                        >
                          <div className="w-2.5 h-2.5 bg-[var(--ink)] border-2 border-[var(--paper)] group-hover:scale-150 transition-transform duration-200" />
                        </div>

                        {/* Event content */}
                        <div>
                          <h3 className="font-serif text-xl md:text-2xl mb-1 group-hover:text-[var(--accent)] transition-colors">
                            {event.title}
                          </h3>
                          <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
                            {event.description.substring(0, 80)}
                            {event.description.length > 80 ? '...' : ''}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footnote - scattered */}
                  {footnote && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="absolute right-0 top-20 w-48 font-mono text-[9px] md:text-[10px] text-[var(--muted)] leading-relaxed italic"
                      style={{
                        transform: `rotate(${Math.random() * 4 - 2}deg)`,
                      }}
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
                      transition={{ delay: 0.3 }}
                      className="absolute -left-32 top-16 font-mono text-xs text-[var(--muted)] group cursor-help"
                    >
                      <div className="flex items-center gap-2">
                        <span>🎲</span>
                        <span>{dice.roll}/10</span>
                      </div>
                      <div className="absolute left-0 top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] whitespace-nowrap bg-[var(--paper)] border border-[var(--divider)] px-2 py-1">
                        {t('এই বছরের ভাইব। শুভকামনা।', "This year's vibe. Best of luck.")}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Present - pulsing dot at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="relative pt-20 pb-40"
            >
              <div className="absolute -left-16 top-0 font-mono text-sm text-[var(--muted)] w-12 text-right">
                {currentYear}
              </div>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-4 h-4 bg-[var(--accent)] mb-4"
                />
                <p className="font-serif text-2xl md:text-3xl text-center">
                  {t('আপনি, এখন', 'You, now')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Rejected futures section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 space-y-4 max-w-2xl"
          >
            <h3 className="font-mono text-sm text-[var(--muted)] mb-8 tracking-wider">
              {t('প্রত্যাখ্যাত টাইমলাইন', 'REJECTED TIMELINES')}
            </h3>
            {data.rejectedFutures.map((rejected, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="border border-[var(--ghost)] p-6 text-[var(--ghost)]"
              >
                <div className="font-serif text-lg md:text-xl mb-2">
                  [ {t('প্রত্যাখ্যাত', 'Rejected')}: {rejected.title} ✕ ]
                </div>
                <div className="font-mono text-xs leading-relaxed">{rejected.reason}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Event popup modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--paper)] border-2 border-[var(--ink)] p-8 max-w-lg w-full"
          >
            <div className="font-mono text-xs text-[var(--muted)] mb-4 tracking-wider">
              {selectedEvent.year} · {selectedEvent.side.toUpperCase()} SIDE · {selectedEvent.category.toUpperCase()}
            </div>

            <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
              {selectedEvent.title}
            </h2>

            <p className="font-sans text-base md:text-lg mb-6 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="border-l-4 border-[var(--accent)] pl-4 mb-8 py-2">
              <p className="font-mono text-sm text-[var(--muted)] leading-relaxed">
                {selectedEvent.twist}
              </p>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="font-mono text-sm border border-[var(--ink)] px-6 py-2 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            >
              [ {t('বন্ধ করুন', 'close')} ]
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Export button - fixed bottom right */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => alert(t('এক্সপোর্ট ফিচার শীঘ্রই আসছে (Phase 4)', 'Export feature coming in Phase 4'))}
        className="fixed bottom-8 right-8 font-mono text-sm border-2 border-[var(--ink)] px-6 py-3 bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors z-50 shadow-lg"
      >
        [ {t('পোস্টার এক্সপোর্ট করুন', 'Export Poster')} ↓ ]
      </motion.button>
    </div>
  );
}
