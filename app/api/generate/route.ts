import { NextResponse } from 'next/server';

// DATA POOLS (same as client)
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

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age } = body;

    if (!name || !age) {
      return NextResponse.json(
        { error: 'Name and age are required' },
        { status: 400 }
      );
    }

    // Generate future
    const deathAge = 60 + Math.floor(Math.random() * 21);
    const yearsLeft = deathAge - age;

    // Pick 5 major events
    const selectedEvents = shuffleArray(majorEventsPool).slice(0, 5);

    // Spread events across lifespan
    const events = selectedEvents.map((event, index) => {
      const ageGap = Math.floor(yearsLeft / 6);
      const eventAge = age + (index + 1) * ageGap + Math.floor(Math.random() * 3);
      return {
        ...event,
        age: Math.min(eventAge, deathAge - 1)
      };
    }).sort((a, b) => a.age - b.age);

    // Add Death as final event
    const deathDesc = deathDescriptions[Math.floor(Math.random() * deathDescriptions.length)];
    events.push({
      age: deathAge,
      side: "center",
      title: "Death",
      desc: deathDesc
    });

    const response = {
      reference: `BPF/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      deathAge,
      events,
      rejected: shuffleArray(rejectedPool).slice(0, 3),
      footnotes: shuffleArray(footnotesPool).slice(0, 3),
      warning: "Timeline accuracy: 61%. Choices alter the path. Re-consult in 6 months."
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate future' },
      { status: 500 }
    );
  }
}
