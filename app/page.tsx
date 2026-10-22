'use client';

import { useState, useEffect, useMemo } from 'react';

// DATA POOLS
const questionsPool = [
  "আপনার নাম?",
  "আপনার বয়স?",
  "আপনার ব্রাউজার হিস্ট্রিতে সবচেয়ে অদ্ভুত সার্চ কী?",
  "রাত ৩টায় ফ্রিজ খুললে কী খুঁজে পান?",
  "আপনার সবচেয়ে অকাজের ট্যালেন্ট কী?",
  "চা না কফি? (সত্যি বলবেন)",
  "আপনি কি কখনো অচেনা মানুষের সাথে রিকশা শেয়ার করেছেন?",
  "আপনার জীবনের সবচেয়ে বড় মিথ্যা কী ছিল?",
  "মোবাইল চার্জার ছাড়া বাইরে গেলে আপনার কি হয়?",
  "রাস্তায় টাকা পড়ে থাকলে আপনি কি নেন?",
  "আপনার লাস্ট গুগল সার্চ কি ছিল?",
  "বাসে কেউ সিট নিয়ে নিলে আপনি কী করেন?",
  "Sorry, payment হয়ে গেছে — দিনে কতবার বলেন?",
  "আপনার সবচেয়ে অলস দিনের রুটিন কী?",
  "এমন কোনো খাবার আছে যা আপনি কখনো ভাগ করেন না?",
  "আপনি কি কখনো গোসল না করেই বাইরে বেরিয়েছেন?",
  "আপনার সবচেয়ে বাজে জোকস কোনটা?",
  "বৃষ্টির দিনে আপনি সাধারণত কী করেন?",
  "আপনার ফোনের ব্যাটারি ১% হলে আপনি কী করেন?",
  "কোনো জিনিস হারিয়ে ফেললে আপনি কতক্ষণ খোঁজেন?",
];

const majorEventsPool = [
  { side: "right", title: "First Real Job", desc: "Started working. Pretended to understand everything." },
  { side: "left", title: "Married", desc: "To someone who tolerates your existence. Mostly." },
  { side: "right", title: "Promotion", desc: "New title. Same work. You acted surprised." },
  { side: "left", title: "Child Born", desc: "A small human arrived. You panic daily." },
  { side: "right", title: "Career Peak", desc: "You finally feel competent. It lasts 3 months." },
  { side: "left", title: "Major Loss", desc: "Someone close left. You never fully recovered." },
  { side: "right", title: "Retirement", desc: "Stopped working. Realized you have no hobbies." },
  { side: "left", title: "House Purchased", desc: "Bought a home. Mortgage: 25 years." },
  { side: "right", title: "Business Failed", desc: "Tried entrepreneurship. Lost everything. Back to job." },
  { side: "left", title: "Second Marriage", desc: "After divorce. This one lasted." },
  { side: "right", title: "Fired", desc: "Lost your job at 42. Survived. Barely." },
  { side: "left", title: "Health Scare", desc: "A hospital stay. Changed your priorities. For a month." },
  { side: "right", title: "Moved Abroad", desc: "Started over in a new country. Regretted it twice." },
  { side: "left", title: "Debt Cleared", desc: "Finally paid everything off. Felt free for 6 days." },
  { side: "right", title: "Side Business", desc: "Turned a hobby into income. Barely sustainable." },
];

const deathDescriptions = [
  "Death. Cause: Tuesday.",
  "Death. You were 3 minutes late to your own funeral.",
  "Death. Reason: Forgot to update antivirus.",
  "Death. The universe got bored.",
  "Death. Final words: 'Just 5 more minutes.'",
  "Death. No refunds issued.",
  "Death. Your to-do list remains unfinished.",
  "Death. Cause: Pending investigation since 2047.",
  "Death. You finally got some rest.",
  "Death. Occurs on a Monday. Classic.",
];

const rejectedPool = [
  { title: "YouTuber", reason: "Views: 3. Subscribers: 1 (mom). Deleted 2030." },
  { title: "Chef", reason: "You burn water on day 1." },
  { title: "Politician", reason: "47 'um's in first speech." },
  { title: "Astronaut", reason: "Failed the height requirement by 1 inch." },
  { title: "Stand-up Comedian", reason: "You forgot the punchline. Every single time." },
  { title: "Billionaire", reason: "Invested all your money in a friend's 'genius' idea." },
];

const footnotesPool = [
  "You will lose your office ID card. Twice.",
  "You will argue with a rickshaw driver. You will lose.",
  "You will cry at a Zara ad. Cause: unknown.",
  "You will finally reply. Too late.",
  "You will learn to cook exactly one dish: khichuri.",
  "You will say 'last 5 minutes' and take 45 minutes.",
  "You will forget your own password. Again.",
  "You will pretend to read an article but only read the headline.",
  "You will accidentally like an ex's photo from 2018.",
  "You will buy a gym membership and use it 4 times.",
];

// Randomization helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// MOCK API: Generate future based on user data
function generateFuture(name: string, age: number) {
  // Death age between 60-80
  const deathAge = 60 + Math.floor(Math.random() * 21);

  // Calculate lifespan remaining
  const yearsLeft = deathAge - age;

  // Pick 5 major events (not including death)
  const selectedEvents = shuffleArray(majorEventsPool).slice(0, 5);

  // Spread events across lifespan
  const events = selectedEvents.map((event, index) => {
    const ageGap = Math.floor(yearsLeft / 6); // Divide lifespan into chunks
    const eventAge = age + (index + 1) * ageGap + Math.floor(Math.random() * 3);
    return {
      ...event,
      age: Math.min(eventAge, deathAge - 1) // Don't exceed death age
    };
  }).sort((a, b) => a.age - b.age);

  // Add Death as final event
  const deathDesc = deathDescriptions[Math.floor(Math.random() * deathDescriptions.length)];
  events.push({
    age: deathAge,
    side: "center" as const,
    title: "Death",
    desc: deathDesc
  });

  return {
    deathAge,
    events,
    rejected: shuffleArray(rejectedPool).slice(0, 3),
    footnotes: shuffleArray(footnotesPool).slice(0, 3)
  };
}

export default function Home() {
  const [screen, setScreen] = useState<'entry' | 'form' | 'loading' | 'result'>('entry');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  // Randomize questions on mount
  const randomQuestions = useMemo(() => {
    return shuffleArray(questionsPool).slice(0, 6);
  }, []);

  // Generate future data when form completes
  const [futureData, setFutureData] = useState<ReturnType<typeof generateFuture> | null>(null);

  const loadingTexts = [
    '> Opening file BPF/2026/4471...',
    '> Retrieving karma records...',
    '> Cross-referencing with fate board...',
    '> Calculating lifespan...',
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
        // Generate future data before showing result
        const name = answers[0] || 'Unknown';
        const age = parseInt(answers[1]) || 25;
        setFutureData(generateFuture(name, age));

        const finalTimer = setTimeout(() => {
          setScreen('result');
        }, 800);
        return () => clearTimeout(finalTimer);
      }
    }
  }, [screen, loadingStep, answers]);

  // Form Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentAnswer.trim()) {
      const newAnswers = [...answers, currentAnswer];
      setAnswers(newAnswers);
      setCurrentAnswer('');

      if (currentQuestion < randomQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setScreen('loading');
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const userAge = parseInt(answers[1]) || 25;

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
            {randomQuestions[currentQuestion]}
          </h2>

          <input
            type={currentQuestion === 1 ? "number" : "text"}
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
            width: `${((currentQuestion + 1) / randomQuestions.length) * 100}%`,
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

  // RESULT SCREEN - LIFESPAN TIMELINE
  if (!futureData) return null;

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
        maxWidth: '220px',
      }}>
        <div style={{ fontWeight: 'bold' }}>⚠ FATE BOARD WARNING</div>
        <div style={{ fontSize: '10px', marginTop: '8px' }}>
          Timeline accuracy: 61%<br/>
          Projected lifespan: {futureData.deathAge} years<br/>
          No appeals accepted.
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

      {/* "You, Now" marker at TOP */}
      <div style={{
        textAlign: 'center',
        marginTop: '100px',
        marginBottom: '60px',
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          background: '#C4422D',
          margin: '0 auto 12px',
        }} />
        <div className="font-bengali" style={{
          fontSize: '20px',
          fontWeight: 600,
        }}>
          আপনি, এখন
        </div>
        <div className="font-mono" style={{
          fontSize: '11px',
          color: '#8B8378',
          marginTop: '4px',
        }}>
          Age {userAge} · Year {currentYear}
        </div>
      </div>

      {/* Timeline flows DOWNWARDS by AGE */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {futureData.events.map((event, index) => {
          const isDeathEvent = event.title === "Death";
          const yearFromNow = currentYear + (event.age - userAge);

          return (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: event.side === 'center' ? '1fr' : '1fr 120px 1fr',
                gap: '40px',
                marginBottom: isDeathEvent ? '40px' : '100px',
                alignItems: 'start',
              }}
            >
              {event.side === 'center' ? (
                // DEATH EVENT - CENTER ALIGNED
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  border: '3px solid #C4422D',
                  background: '#F2EDE4',
                }}>
                  <div className="font-mono" style={{
                    fontSize: '12px',
                    color: '#C4422D',
                    marginBottom: '12px',
                    letterSpacing: '2px',
                  }}>
                    AGE {event.age} · YEAR {yearFromNow}
                  </div>
                  <h3 className="font-serif" style={{
                    fontSize: '32px',
                    marginBottom: '12px',
                    color: '#C4422D',
                  }}>
                    {event.title}
                  </h3>
                  <p className="font-mono" style={{
                    fontSize: '13px',
                    color: '#8B8378',
                    lineHeight: '1.6',
                  }}>
                    {event.desc}
                  </p>
                </div>
              ) : (
                <>
                  {/* LEFT COLUMN */}
                  <div style={{ textAlign: 'right' }}>
                    {event.side === 'left' && (
                      <>
                        <div className="font-mono" style={{
                          fontSize: '12px',
                          color: '#8B8378',
                          marginBottom: '8px',
                        }}>
                          Age {event.age} · {yearFromNow}
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
                      </>
                    )}
                  </div>

                  {/* CENTER - Thread dot */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#1A1A1A',
                      border: '2px solid #F2EDE4',
                      position: 'relative',
                      zIndex: 2,
                    }} />

                    {/* Connecting line to next event */}
                    {index < futureData.events.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: isDeathEvent ? '80px' : '140px',
                        background: '#1A1A1A',
                        zIndex: 1,
                      }} />
                    )}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div style={{ textAlign: 'left' }}>
                    {event.side === 'right' && (
                      <>
                        <div className="font-mono" style={{
                          fontSize: '12px',
                          color: '#8B8378',
                          marginBottom: '8px',
                        }}>
                          Age {event.age} · {yearFromNow}
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
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Footnotes */}
      <div style={{
        maxWidth: '1200px',
        margin: '100px auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {futureData.footnotes.map((note, i) => (
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

      {/* Rejected Timelines */}
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
          {futureData.rejected.map((rejected, i) => (
            <div key={i} style={{ border: '1px solid #C4BDB2', padding: '20px', color: '#C4BDB2' }}>
              <div className="font-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>
                [ Rejected: {rejected.title} ✕ ]
              </div>
              <div className="font-mono" style={{ fontSize: '11px' }}>
                {rejected.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
