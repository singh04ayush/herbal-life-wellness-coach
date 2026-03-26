import React, { useEffect, useRef } from 'react';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import doodle1 from '../assets/doodle1.png';
import sustainable from '../assets/sustainable.png';
import ContactUsSection from '../components/ContactUsSection';

const milestones = [
  { year: '1980', event: 'Founded in Los Angeles, USA by Mark R. Hughes' },
  { year: '1990', event: 'Expanded to 10+ countries; became a global nutrition phenomenon' },
  { year: '1995', event: 'Entered the Indian market, changing millions of lives' },
  { year: '2004', event: 'Listed on NYSE; commitment to scientific nutrition strengthened' },
  { year: '2016', event: 'Became a top-5 nutrition brand globally by revenue' },
  { year: '2026', event: 'Present in 90+ countries with 7M+ independent distributors' },
];

const values = [
  {
    icon: '🔬',
    title: 'Science-First',
    desc: 'Our products are developed by over 200 scientists and doctors, backed by rigorous clinical research.',
    color: '#e8f5e2',
  },
  {
    icon: '🌿',
    title: 'Plant-Powered',
    desc: 'We harness the power of nature — herbs, botanicals, and whole foods — in every formulation.',
    color: '#e8f5e2',
  },
  {
    icon: '🤝',
    title: 'Community',
    desc: 'More than products — we build communities of wellness coaches who guide you personally.',
    color: '#e8f5e2',
  },
];

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    pageRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="pt-16">
      {/* Hero Banner */}
      <section
        className="relative py-24 flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #e8f5e2 0%, #f0faf0 60%, #fff 100%)' }}
      >
        <img src={doodle1} alt="" className="absolute top-8 right-12 w-20 opacity-15 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal space-y-6">
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ background: '#2d5a27', color: 'white' }}
              >
                About Herbalife
              </span>
              <h1
                className="text-5xl sm:text-6xl font-bold leading-tight"
                style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
              >
                Nutrition for a better life
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                For over 40 years, Herbalife has been at the forefront of nutrition science, helping people around
                the world achieve and maintain healthy, active lives. Our mission is simple: to improve nutritional
                habits globally with science-backed products and a supportive community.
              </p>
              <div className="flex gap-8">
                {[
                  { n: '40+', l: 'Years' }, { n: '90+', l: 'Countries' }, { n: '7M+', l: 'Distributors' }
                ].map(s => (
                  <div key={s.l}>
                    <p className="text-3xl font-bold" style={{ color: '#2d5a27', fontFamily: '"Caveat", cursive' }}>{s.n}</p>
                    <p className="text-sm text-gray-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal relative">
              <img
                src={img6}
                alt="Herbalife Story"
                className="w-full rounded-3xl shadow-2xl object-cover"
                style={{ aspectRatio: '4/3' }}
              />
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <img src={sustainable} alt="" className="w-10 h-10 object-contain" />
                <div>
                  <p className="font-semibold text-sm text-gray-800">Sustainable</p>
                  <p className="text-xs text-gray-500">Ethically sourced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: '#e8f5e2', color: '#2d5a27' }}>
              Our Mission
            </span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}>
              We believe everyone deserves to live their best life
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to change people's lives by providing the best business opportunity in direct selling
              and the best nutrition and weight-management products in the world.
            </p>
          </div>

          {/* Values */}
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(v => (
              <div
                key={v.title}
                className="p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow group"
                style={{ background: v.color }}
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3a16' }}>{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a16, #2d5a27)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Our journey through the decades
            </h2>
          </div>

          <div className="reveal relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  className={`flex flex-col md:flex-row gap-6 items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className="inline-block bg-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all"
                    >
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{ color: '#a8d5a2', fontFamily: '"Caveat", cursive' }}
                      >
                        {m.year}
                      </p>
                      <p className="text-white/90 text-sm">{m.event}</p>
                    </div>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white bg-[#2d5a27] flex-shrink-0 hidden md:block"
                  />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team / Products highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img src={img7} alt="" className="rounded-2xl shadow-lg w-full object-cover" style={{ aspectRatio: '1' }} />
              <img src={img8} alt="" className="rounded-2xl shadow-lg w-full object-cover mt-8" style={{ aspectRatio: '1' }} />
            </div>
            <div className="space-y-6">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ background: '#e8f5e2', color: '#2d5a27' }}>
                Why India Loves Us
              </span>
              <h2 className="text-4xl font-bold" style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}>
                Crafted for every Indian lifestyle
              </h2>
              <p className="text-gray-600 leading-relaxed">
                From Kulfi-flavoured shakes to Kashmiri Kahwa teas — our India-exclusive formulations honour
                local tastes while delivering world-class nutrition. Ayurvedic ingredients meet modern science.
              </p>
              <ul className="space-y-3">
                {[
                  'Made for Indian nutritional needs',
                  'Ayurvedic ingredients in every range',
                  'FSSAI approved, globally certified',
                  'Trusted by fitness coaches across India',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: '#2d5a27' }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactUsSection />
    </div>
  );
};

export default About;
