'use client';

import { useState, useEffect } from 'react';

const mockData = {
  events: [
    { year: 2027, side: "right", title: "First Job", desc: "Joined a company. Title: Junior Something." },
    { year: 2028, side: "left", title: "Cat Acquired", desc: "A small orange cat appeared. You named it Beta." },
    { year: 2029, side: "right", title: "The Struggle Year", desc: "Everything felt off. Bought 3 self-help books. Read: 0." },
    { year: 2031, side: "left", title: "Married", desc: "To someone who tolerates your existence." },
    { year: 2032, side: "right", title: "Promotion", desc: "Finally recognized. New title: Senior Something." }
  ],
  footnotes: [
    "2026 — You will lose your office ID card. Twice.",
    "2028 — You will argue with a rickshaw driver. You will lose.",
    "2033 — You will consider getting another cat. Beta will veto this."
  ]
};

const questions = [
  'আপনার নাম?',
  'আপনার বয়স?',
  'আপনার শখ?',
  'রাত ৩টায় ফ্রিজ খুললে কী খুঁজে পান?',
  'বিড়াল আপনার চায়ের কাপ থেকে চা খেয়ে ফেললে আপনার প্রতিক্রিয়া?',
  'আপনার জীবনের সবচেয়ে বড় মিথ্যা কী ছিল?'
];

export default function Home() {
  const [screen, setScreen] = useState<'entry' | 'form' | 'loading' | 'result'>('entry');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingTexts = [
    '> Opening file BPF/2026/4471...',
    '> Retrieving karma records...',
    '> Cross-referencing with fate board...',
    '> Warning: 3 rejected timelines found.',
    '> Timeline accuracy: 61%.',
    '> Ready.'
  ];

  // Loading screen typewriter effect
  useEffect(() => {
    if (screen === 'loading') {
      if (loadingStep < loadingTexts.length) {
        const timer = setTimeout(() => {
          setLoadingStep(loadingStep + 1);
        }, 600);
        return () => clearTimeout(timer);
      } else {
        const finalTimer = setTimeout(() => {
          setScreen('result');
        }, 1000);
        return () => clearTimeout(finalTimer);
      }
    }
  }, [screen, loadingStep]);

  // Form Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentAnswer.trim()) {
      const newAnswers = [...answers, currentAnswer];
      setAnswers(newAnswers);
      setCurrentAnswer('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setScreen('loading');
      }
    }
  };

  // ENTRY SCREEN
  if (screen === 'entry') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
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

        <div style={{ textAlign: 'center', maxWidth: '900px', padding: '0 40px' }}>
          <h1 className="font-bengali" style={{
            fontSize: '56px',
            lineHeight: '1.4',
            marginBottom: '24px',
            color: '#1A1A1A',
            fontWeight: 600,
          }}>
            আপনি কি আপনার ভবিষ্যৎকে এক্সেপ্ট করার জন্য প্রস্তুত?
          </h1>

          <p className="font-mono" style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#8B8378',
            marginBottom: '48px',
          }}>
            BUREAU OF PERSONAL FUTURES · EST. 2026
          </p>

          <button
            onClick={() => setScreen('form')}
            className="font-mono"
            style={{
              fontSize: '16px',
              color: '#1A1A1A',
              background: 'none',
              border: 'none',
              borderBottom: '2px solid #1A1A1A',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            [ Enter ]
          </button>
        </div>

        <div className="font-mono" style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          color: '#8B8378',
        }}>
          আমরা আপনার ডেটা সংরক্ষণ করি না
        </div>
      </div>
    );
  }

  // FORM SCREEN
  if (screen === 'form') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div className="font-mono" style={{
            fontSize: '10px',
            color: '#8B8378',
            marginBottom: '40px',
            letterSpacing: '2px',
          }}>
            STEP {String(currentQuestion + 1).padStart(2, '0')} / 06
          </div>

          <h2 className="font-bengali" style={{
            fontSize: '48px',
            lineHeight: '1.4',
            marginBottom: '60px',
            color: '#1A1A1A',
            fontWeight: 500,
          }}>
            {questions[currentQuestion]}
          </h2>

          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="font-bengali"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '2px solid #1A1A1A',
              fontSize: '24px',
              padding: '8px 0',
              color: '#1A1A1A',
              outline: 'none',
            }}
          />

          <div className="font-mono" style={{
            fontSize: '11px',
            color: '#8B8378',
            marginTop: '20px',
          }}>
            Press Enter to continue
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#D6CFC3',
        }}>
          <div style={{
            height: '100%',
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            background: '#C4422D',
            transition: 'width 0.3s',
          }} />
        </div>
      </div>
    );
  }

  // LOADING SCREEN
  if (screen === 'loading') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10%',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="font-mono" style={{
          fontSize: '14px',
          color: '#1A1A1A',
          lineHeight: '2',
        }}>
          {loadingTexts.slice(0, loadingStep).map((text, i) => (
            <div key={i} style={{
              color: i === loadingTexts.length - 1 ? '#C4422D' : '#1A1A1A'
            }}>
              {text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // RESULT SCREEN - THE THREAD
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      padding: '80px 5%',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Warning stamp - top left, rotated */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        transform: 'rotate(-8deg)',
        border: '4px double #C4422D',
        padding: '16px',
        color: '#C4422D',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        textAlign: 'center',
        lineHeight: '1.6',
        maxWidth: '200px',
      }}>
        <div style={{ fontWeight: 'bold' }}>⚠ FATE BOARD WARNING</div>
        <div style={{ fontSize: '10px', marginTop: '8px' }}>
          Timeline accuracy: 61%<br/>
          Choices alter the path.
        </div>
      </div>

      {/* Reference number - top right */}
      <div className="font-mono" style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        fontSize: '11px',
        color: '#8B8378',
        textAlign: 'right',
        lineHeight: '1.5',
      }}>
        BPF/2026/4471<br/>
        CONFIDENTIAL
      </div>

      {/* 3-Column Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px 1fr',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '100px',
      }}>
        {/* LEFT COLUMN - Personal Events */}
        <div style={{ textAlign: 'right' }}>
          {mockData.events.filter(e => e.side === 'left').map((event, i) => (
            <div key={i} style={{ marginBottom: '120px' }}>
              <div className="font-mono" style={{
                fontSize: '12px',
                color: '#8B8378',
                marginBottom: '8px',
              }}>
                {event.year}
              </div>
              <h3 className="font-serif" style={{
                fontSize: '24px',
                marginBottom: '8px',
                color: '#1A1A1A',
              }}>
                {event.title}
              </h3>
              <p className="font-mono" style={{
                fontSize: '12px',
                color: '#8B8378',
                lineHeight: '1.6',
              }}>
                {event.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CENTER COLUMN - Thread Line & Years */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}>
          {/* Wobbly SVG line */}
          <svg
            width="2"
            height="100%"
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
          >
            <path
              d="M1 0 Q 3 100 1 200 Q -1 300 1 400 Q 3 500 1 600 Q -1 700 1 800 Q 3 900 1 1000"
              stroke="#1A1A1A"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Year markers */}
          {mockData.events.map((event, i) => (
            <div key={i} style={{
              marginBottom: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#1A1A1A',
                border: '2px solid #F2EDE4',
              }} />
            </div>
          ))}

          {/* Present marker */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: '#C4422D',
              margin: '0 auto 12px',
            }} />
            <div className="font-serif" style={{ fontSize: '16px' }}>
              You, now
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Career Events */}
        <div style={{ textAlign: 'left' }}>
          {mockData.events.filter(e => e.side === 'right').map((event, i) => (
            <div key={i} style={{ marginBottom: '120px' }}>
              <div className="font-mono" style={{
                fontSize: '12px',
                color: '#8B8378',
                marginBottom: '8px',
              }}>
                {event.year}
              </div>
              <h3 className="font-serif" style={{
                fontSize: '24px',
                marginBottom: '8px',
                color: '#1A1A1A',
              }}>
                {event.title}
              </h3>
              <p className="font-mono" style={{
                fontSize: '12px',
                color: '#8B8378',
                lineHeight: '1.6',
              }}>
                {event.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footnotes - scattered below */}
      <div style={{
        maxWidth: '1200px',
        margin: '80px auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {mockData.footnotes.map((note, i) => (
          <div
            key={i}
            className="font-mono"
            style={{
              fontSize: '11px',
              color: '#8B8378',
              fontStyle: 'italic',
              marginLeft: i % 2 === 0 ? '0' : 'auto',
              marginRight: i % 2 === 0 ? 'auto' : '0',
              maxWidth: '400px',
              transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
            }}
          >
            {note}
          </div>
        ))}
      </div>

      {/* Rejected Timelines - bottom section */}
      <div style={{
        maxWidth: '800px',
        margin: '120px auto 80px',
      }}>
        <h3 className="font-mono" style={{
          fontSize: '11px',
          color: '#8B8378',
          letterSpacing: '2px',
          marginBottom: '32px',
        }}>
          REJECTED TIMELINES
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ border: '1px solid #C4BDB2', padding: '20px', color: '#C4BDB2' }}>
            <div className="font-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>
              [ Rejected: YouTuber ✕ ]
            </div>
            <div className="font-mono" style={{ fontSize: '11px' }}>
              Views: 3. Subscribers: 1 (mom). Deleted 2030.
            </div>
          </div>

          <div style={{ border: '1px solid #C4BDB2', padding: '20px', color: '#C4BDB2' }}>
            <div className="font-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>
              [ Rejected: Chef ✕ ]
            </div>
            <div className="font-mono" style={{ fontSize: '11px' }}>
              You burn water on day 1.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
