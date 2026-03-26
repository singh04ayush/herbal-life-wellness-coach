import React, { useEffect, useRef } from 'react';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import doodle1 from '../assets/doodle1.png';
import doodle2 from '../assets/doodle2.png';
import curveDoodle from '../assets/curveDoodle.png';
import curveArrow from '../assets/curve-arrow-doodle.png';
import { Link } from 'react-router-dom';

// Circuit node milestones for Rani's journey
const milestones = [
  {
    id: 1,
    phase: 'The Beginning',
    date: 'Jan 2022',
    title: 'Rock bottom moment',
    story:
      'At 34, Rani Mishra was exhausted. Three kids, a demanding career, and 20 kg of extra weight that had crept up over a decade. She felt invisible in her own life — drained, sluggish, and quietly heartbroken.',
    emotion: '😞',
    stat: '82 kg',
    statLabel: 'Starting weight',
    type: 'before',
    image: img9,
    color: '#e57373',
  },
  {
    id: 2,
    phase: 'The Discovery',
    date: 'Feb 2022',
    title: 'A friend changed everything',
    story:
      'Rani\'s colleague — an independent Herbalife distributor — simply handed her a Formula 1 shake after a meeting. "You look tired," she said. Rani laughed it off, but went home and cried. She decided: this was the moment to change.',
    emotion: '💡',
    stat: 'Day 1',
    statLabel: 'Of her new life',
    type: 'turning',
    image: img2,
    color: '#ffb74d',
  },
  {
    id: 3,
    phase: 'The Struggle',
    date: 'Mar–Apr 2022',
    title: 'It wasn\'t easy at first',
    story:
      'The first six weeks were hard. Rani had to relearn her relationship with food. She replaced two meals with Formula 1 shakes, added Herbalife teas to her mornings, and began 20-minute walks. Some days she slipped. But she didn\'t quit.',
    emotion: '💪',
    stat: '-4 kg',
    statLabel: 'In first 6 weeks',
    type: 'struggle',
    image: img3,
    color: '#4a8c42',
  },
  {
    id: 4,
    phase: 'The Momentum',
    date: 'May–Sep 2022',
    title: 'Something clicked',
    story:
      'By May, Rani\'s energy was different. She started sleeping better, stopped craving sugar, and her clothes felt looser. She added Herbalife protein supplements and joined a local walking group. She was smiling at strangers again.',
    emotion: '🌱',
    stat: '-12 kg',
    statLabel: 'In 8 months',
    type: 'progress',
    image: img1,
    color: '#2d5a27',
  },
  {
    id: 5,
    phase: 'The Transformation',
    date: 'Dec 2022',
    title: 'She ran her first 5K',
    story:
      'On a misty December morning, Rani completed her first 5K run. She cried at the finish line — not from exhaustion, but from joy. One year earlier, she couldn\'t walk to the end of her street without losing her breath.',
    emotion: '🏃‍♀️',
    stat: '5 km',
    statLabel: 'Her first run',
    type: 'milestone',
    image: img10,
    color: '#1a3a16',
  },
  {
    id: 6,
    phase: 'The New Rani',
    date: 'Today · 2026',
    title: 'Living her best life',
    story:
      'Rani is now a certified Herbalife distributor herself, coaching 40+ women on their wellness journeys. She\'s lost 22 kg, built lean muscle, and radiates the kind of happiness that comes from the inside out. She says: "Herbalife didn\'t give me a diet. It gave me back my life."',
    emotion: '✨',
    stat: '-22 kg',
    statLabel: 'Total transformation',
    type: 'after',
    image: img9,
    color: '#2d5a27',
  },
];

const Journey = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = pageRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }

        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }

        .circuit-line {
          background: repeating-linear-gradient(
            90deg,
            #2d5a27 0px,
            #2d5a27 20px,
            transparent 20px,
            transparent 30px
          );
        }
      `}</style>

      <div ref={pageRef} className="pt-16 min-h-screen overflow-hidden">
        {/* ── HERO ── */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3a16 0%, #2d5a27 60%, #4a8c42 100%)' }}
        >
          {/* Decorations */}
          <img src={doodle1} alt="" className="absolute top-24 right-20 w-32 opacity-10 animate-spin" style={{ animationDuration: '25s' }} />
          <img src={curveDoodle} alt="" className="absolute bottom-0 left-0 w-64 opacity-10" />
          <img src={curveArrow} alt="" className="absolute bottom-32 right-1/4 w-20 opacity-20" />

          {/* Grid/circuit bg */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#a8d5a2 1px, transparent 1px), linear-gradient(90deg, #a8d5a2 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="reveal space-y-8">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-green-300">
                  Transformation Journey
                </span>
                <h1
                  className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight text-white"
                  style={{ fontFamily: '"Caveat", cursive' }}
                >
                  Rani's
                  <span className="block" style={{ color: '#a8d5a2' }}>Story</span>
                </h1>
                <p className="text-green-200 text-xl leading-relaxed max-w-lg">
                  From exhausted mother of three to certified wellness coach.
                  A journey of 22 kg, one shake at a time.
                </p>
                <div className="flex flex-wrap gap-6">
                  {[
                    { n: '-22 kg', l: 'Lost' },
                    { n: '4 yrs', l: 'Journey' },
                    { n: '40+', l: 'Women coached' },
                  ].map(s => (
                    <div key={s.l} className="text-center">
                      <p className="text-4xl font-bold text-white" style={{ fontFamily: '"Caveat", cursive' }}>{s.n}</p>
                      <p className="text-green-300 text-sm">{s.l}</p>
                    </div>
                  ))}
                </div>
                <p
                  className="text-xl italic"
                  style={{ fontFamily: '"Indie Flower", cursive', color: '#a8d5a2' }}
                >
                  "Herbalife didn't give me a diet. It gave me back my life."
                </p>
              </div>

              {/* Hero image */}
              <div className="reveal relative flex justify-center">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-20"
                  style={{ background: 'radial-gradient(circle, white, transparent 70%)' }} />
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl opacity-20 bg-white" />
                  <img
                    src={img9}
                    alt="Rani Mishra"
                    className="relative w-full max-w-sm rounded-3xl shadow-2xl object-cover"
                    style={{ aspectRatio: '3/4' }}
                  />
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl text-3xl font-bold"
                    style={{ color: '#2d5a27' }}>
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-300">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-green-300 rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 rounded-full bg-green-300 animate-bounce" />
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER BANNER ── */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="reveal text-center mb-12">
              <h2 className="text-4xl font-bold" style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}>
                Before & After
              </h2>
              <p className="text-gray-500 mt-2">4 years, one decision</p>
            </div>
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Before */}
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <div className="relative">
                  <img src={img9} alt="Before" className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-red-500 text-white font-bold text-sm">
                    Before · Jan 2022
                  </div>
                </div>
                <div className="p-6" style={{ background: '#fff5f5' }}>
                  <p className="font-bold text-lg text-gray-800">82 kg · Exhausted · Unhappy</p>
                  <p className="text-gray-500 text-sm mt-1">Difficulty climbing stairs, no energy, emotionally drained</p>
                </div>
              </div>

              {/* After */}
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <div className="relative">
                  <img src={img10} alt="After" className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold text-sm"
                    style={{ background: '#2d5a27' }}>
                    After · 2026
                  </div>
                </div>
                <div className="p-6" style={{ background: '#e8f5e2' }}>
                  <p className="font-bold text-lg text-gray-800">60 kg · Energised · Thriving</p>
                  <p className="text-gray-500 text-sm mt-1">Runs 5K, coaches 40+ women, glowing with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CIRCUIT TIMELINE ── */}
        <section
          className="py-24 relative overflow-hidden"
          style={{ background: '#fafdf9' }}
        >
          <img src={doodle2} alt="" className="absolute top-10 right-10 w-20 opacity-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal text-center mb-20">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ background: '#e8f5e2', color: '#2d5a27' }}>
                The Full Circuit
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}>
                Every step of the journey
              </h2>
            </div>

            {/* Circuit milestones */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
                style={{ background: 'repeating-linear-gradient(to bottom, #2d5a27 0px, #2d5a27 15px, transparent 15px, transparent 25px)' }} />

              <div className="space-y-16">
                {milestones.map((m, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div key={m.id} className={`flex flex-col md:flex-row gap-8 items-center ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                      {/* Content card */}
                      <div className={`flex-1 ${isLeft ? 'reveal-left' : 'reveal-right'}`}>
                        <div
                          className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-green-50"
                          style={{ background: 'white' }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{m.emotion}</span>
                            <div>
                              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4a8c42' }}>
                                {m.phase} · {m.date}
                              </span>
                              <h3 className="text-xl font-bold text-gray-800">{m.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-4">{m.story}</p>
                          <div
                            className="inline-flex items-baseline gap-2 px-4 py-2 rounded-full"
                            style={{ background: '#e8f5e2' }}
                          >
                            <span className="text-2xl font-bold" style={{ color: m.color, fontFamily: '"Caveat", cursive' }}>
                              {m.stat}
                            </span>
                            <span className="text-xs text-gray-500">{m.statLabel}</span>
                          </div>
                        </div>
                      </div>

                      {/* Circuit node */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white z-10"
                          style={{ background: m.color }}
                        >
                          {m.emotion}
                        </div>
                      </div>

                      {/* Image */}
                      <div className={`flex-1 ${isLeft ? 'reveal-right' : 'reveal-left'}`}>
                        <img
                          src={m.image}
                          alt={m.title}
                          className="w-full max-w-xs mx-auto rounded-2xl shadow-lg object-cover"
                          style={{ aspectRatio: '4/3' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── QUOTE SECTION ── */}
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a3a16, #2d5a27)' }}
        >
          <img src={curveDoodle} alt="" className="absolute -bottom-10 -left-10 w-48 opacity-10" />
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="reveal">
              <p className="text-6xl mb-6">🌿</p>
              <blockquote
                className="text-3xl sm:text-4xl text-white leading-relaxed mb-8"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                "I was surviving. Now I'm living. Herbalife was the bridge."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img src={img10} alt="Rani" className="w-14 h-14 rounded-full object-cover border-2 border-white" />
                <div className="text-left">
                  <p className="text-white font-bold">Rani Mishra</p>
                  <p className="text-green-300 text-sm">Wellness Coach · Herbalife Distributor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="reveal space-y-6">
              <h2
                className="text-4xl font-bold"
                style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
              >
                Ready to write your own story?
              </h2>
              <p className="text-gray-600">
                Rani's journey began with a single shake. Yours can too.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: 'linear-gradient(135deg, #2d5a27, #4a8c42)' }}
                >
                  Start with Formula 1 →
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 font-semibold hover:-translate-y-0.5 transition-all"
                  style={{ borderColor: '#2d5a27', color: '#2d5a27' }}
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Journey;
