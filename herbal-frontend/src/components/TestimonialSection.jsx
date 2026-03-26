import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets, testimonialsData } from '../assets/assets';

const TestimonialSection = () => {
    // Duplicate data for seamless looping
    const duplicatedData = [...testimonialsData, ...testimonialsData];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a3a16 0%, #2d5a27 100%)' }}
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl bg-white" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5 blur-3xl bg-white" />

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-3 bg-white/10 text-white"
                    >
                        Real Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                        style={{ fontFamily: '"Caveat", cursive' }}
                    >
                        Transformations that inspire
                    </motion.h2>
                </div>

                {/* Marquee Container */}
                <div className="flex overflow-hidden relative">
                    <motion.div
                        className="flex gap-6 py-4"
                        animate={{
                            x: ['0%', '-50%'],
                        }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {duplicatedData.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="w-[300px] sm:w-[350px] flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-white/15 transition-colors group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white/20 mb-4 shadow-md group-hover:scale-105 transition-transform"
                                    />

                                    <div className="flex gap-0.5 mb-3">
                                        {Array(testimonial.stars).fill().map((_, i) => (
                                            <img
                                                key={i}
                                                src={assets.rating_star}
                                                alt="star"
                                                className="w-4 h-4"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-white text-sm italic leading-relaxed mb-4 font-light line-clamp-3">
                                        "{testimonial.text}"
                                    </p>

                                    <div>
                                        <h3 className="text-lg font-bold text-white" style={{ fontFamily: '"Caveat", cursive' }}>
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-green-300 text-[10px] uppercase tracking-widest font-medium">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default TestimonialSection;
