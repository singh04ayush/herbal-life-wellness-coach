import React, { useState, useEffect, useRef } from 'react';
import doodle3 from '../assets/doodle3.png';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Fitness Enthusiast',
    location: 'Mumbai',
    quote: 'Formula 1 shakes changed my mornings completely. I\'ve lost 8 kg in 3 months without feeling deprived. The mango flavour is absolutely delicious!',
    rating: 5,
    avatar: '👩‍🦱',
    kg: '-8 kg',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    location: 'Bangalore',
    quote: 'As someone with a desk job, Herbalife\'s targeted nutrition supplements helped me stay energised throughout the day. Game changer!',
    rating: 5,
    avatar: '👨‍💼',
    kg: '+5 kg muscle',
  },
  {
    id: 3,
    name: 'Anjali Verma',
    role: 'Working Mother',
    location: 'Delhi',
    quote: 'Balancing work and family left me zero time for proper nutrition. Herbalife made it so easy — quick, nutritious, and my whole family loves the shakes!',
    rating: 5,
    avatar: '👩',
    kg: '-12 kg',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'Marathon Runner',
    location: 'Pune',
    quote: 'The Herbalife24 performance line is incredible for athletes. My recovery time dropped significantly and my endurance has never been better.',
    rating: 5,
    avatar: '🏃‍♂️',
    kg: 'PR in every race',
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-sm">★</span>
    ))}
  </div>
);

const TestimonialSection = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDot = (idx) => {
    clearInterval(intervalRef.current);
    setActive(idx);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a16 0%, #2d5a27 100%)' }}
    >
      {/* Doodle bg */}
      <img src={doodle3} alt="" className="absolute top-10 left-10 w-20 opacity-10" />
      <img src={doodle3} alt="" className="absolute bottom-10 right-10 w-16 opacity-10 rotate-180" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: 'white' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 bg-white/10 text-white">
            Real Stories
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            Transformations that inspire
          </h2>
        </div>

        {/* Active testimonial (big) */}
        <div className="reveal max-w-2xl mx-auto text-center mb-12">
          <div className="text-7xl mb-6">{testimonials[active].avatar}</div>
          <div className="flex justify-center mb-4">
            <StarRating count={testimonials[active].rating} />
          </div>
          <blockquote className="text-white text-xl leading-relaxed italic mb-6 font-light">
            "{testimonials[active].quote}"
          </blockquote>
          <div>
            <p className="font-semibold text-white text-lg">{testimonials[active].name}</p>
            <p className="text-green-300 text-sm">{testimonials[active].role} · {testimonials[active].location}</p>
          </div>
          <div
            className="inline-block mt-4 px-5 py-2 rounded-full font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#a8d5a2' }}
          >
            {testimonials[active].kg}
          </div>
        </div>

        {/* Mini cards */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => handleDot(i)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                active === i
                  ? 'bg-white shadow-xl scale-105'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="text-2xl mb-2">{t.avatar}</div>
              <p className={`font-semibold text-sm ${active === i ? 'text-[#2d5a27]' : 'text-white'}`}>
                {t.name}
              </p>
              <p className={`text-xs ${active === i ? 'text-gray-500' : 'text-green-300'}`}>
                {t.location}
              </p>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDot(idx)}
              className={`rounded-full transition-all duration-200 ${
                active === idx ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
