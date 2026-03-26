import React, { useState, useRef, useEffect } from 'react';
import curveArrow from '../assets/curve-arrow-doodle.png';
import doodle1 from '../assets/doodle1.png';

const ContactUsSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white" id="contact">
      {/* Decorations */}
      <img src={doodle1} alt="" className="absolute top-10 right-16 w-20 opacity-10 animate-spin" style={{ animationDuration: '15s' }} />
      <img src={curveArrow} alt="" className="absolute bottom-10 left-16 w-14 opacity-20" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-5"
        style={{ background: '#2d5a27' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="reveal space-y-6">
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: '#e8f5e2', color: '#2d5a27' }}
            >
              Get In Touch
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ color: '#1a3a16', fontFamily: '"Caveat", cursive' }}
            >
              Ready to start your wellness journey?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Have questions about our products or want to speak to a wellness coach?
              We're here to help you every step of the way.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: '📍', title: 'Visit Us', value: 'Mumbai, Maharashtra, India' },
                { icon: '📞', title: 'Call Us', value: '+91 1800 123 4567' },
                { icon: '✉️', title: 'Email Us', value: 'support@herbalife.in' },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4">
                  <span className="text-2xl w-10 text-center">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{item.title}</p>
                    <p className="text-gray-700 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <div
              className="rounded-3xl p-8 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #e8f5e2, #f0faf0)' }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌿</div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#2d5a27', fontFamily: '"Caveat", cursive' }}>
                    Thank you!
                  </h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-semibold" style={{ color: '#1a3a16' }}>Send us a message</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Priya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-800"
                      style={{ '--tw-ring-color': '#2d5a27' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 rounded-xl border border-green-200 bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-800 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-white font-semibold text-base shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #2d5a27, #4a8c42)' }}
                  >
                    Send Message 🌿
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
