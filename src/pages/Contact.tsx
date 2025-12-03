import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Textarea, Toast } from "../components/ui";
import { BackButton } from "../components/shared/NavigationButtons";
import { useNavigation } from "../hooks/useNavigation";
import { useToast } from "../hooks/useToast";
import OuijaBoardBackground from "../components/OuijaBoardBackground";
import { SpiderField } from "../components/Creatures";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { handleError } from "../utils/errorHandler";
import { MESSAGES } from "../utils/messages";
import { typography, buttons, inputs, cards, backgrounds } from "../utils/themeClasses";

// Tea Room Interactive Components (unused for now)
// @ts-ignore - Unused component for future feature
const _FloatingTeaCup: React.FC<{ delay: number; x: number; y: number }> = ({ delay, x, y }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: [0, 0.7, 0.7],
        scale: [0, 1.2, 1],
        rotate: [180, 0, 0],
        y: [0, -10, 0]
      }}
      transition={{
        delay,
        duration: 2,
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.3, rotate: 15 }}
    >
      {/* Teacup */}
      <div className="relative">
        <motion.div
          className="text-4xl filter drop-shadow-lg"
          animate={isHovered ? { rotate: [0, -5, 5, -5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          ☕
        </motion.div>
        
        {/* Steam */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-t from-zinc-400/40 to-transparent rounded-full blur-sm"
              style={{ left: `${i * 4}px` }}
              animate={{
                y: [-20, -40],
                opacity: [0.6, 0],
                scale: [1, 1.5]
              }}
              transition={{
                delay: i * 0.3,
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// @ts-ignore - Unused component for future feature
const _SugarCube: React.FC<{ x: number; y: number; onDissolve: () => void }> = ({ x, y, onDissolve }) => {
  const [dissolved, setDissolved] = useState(false);
  
  const handleClick = () => {
    setDissolved(true);
    setTimeout(onDissolve, 800);
  };
  
  if (dissolved) return null;
  
  return (
    <motion.div
      className="absolute w-8 h-8 bg-white/90 rounded-sm shadow-lg cursor-pointer pointer-events-auto"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      exit={{ 
        opacity: 0, 
        scale: 0.5,
        y: 20,
        filter: "blur(10px)"
      }}
      transition={{ duration: 0.8 }}
      onClick={handleClick}
      whileHover={{ scale: 1.2, rotate: 45 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-200 rounded-sm" />
      <motion.div
        className="absolute inset-0 bg-white/50 rounded-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

// @ts-ignore - Unused component for future feature
const _TeaLeafMessage: React.FC<{ message: string; delay: number }> = ({ message, delay }) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/4 -translate-x-1/2 pointer-events-none"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [50, 0, 0, -30],
        scale: [0.8, 1, 1, 1.2]
      }}
      transition={{
        delay,
        duration: 4,
        times: [0, 0.2, 0.8, 1]
      }}
    >
      <p className="text-amber-900/60 font-serif text-lg tracking-wider italic">
        {message}
      </p>
    </motion.div>
  );
};

// @ts-ignore - Unused component for future feature
const _LaceDoily: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };
  
  return (
    <motion.div
      className={`absolute ${positions[position]} w-32 h-32 opacity-10 pointer-events-none`}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-100" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-100" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-100" />
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 45 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-amber-100"
          />
        ))}
      </svg>
    </motion.div>
  );
};

export const Contact: React.FC = () => {
  const { goTo } = useNavigation();
  const { showError } = useToast();
  
  // Intro animation state
  const [showIntro, setShowIntro] = useState(true);
  
  // Debug: Log to check if component is rendering
  React.useEffect(() => {
    console.log('Contact page mounted');
    console.log('Prefers reduced motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    console.log('Framer Motion available:', typeof motion !== 'undefined');
  }, []);
  
  // Intro sequence - auto-complete after all messages finish (last message ends at ~26s + 1s buffer)
  useEffect(() => {
    if (!showIntro) return;
    
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 27000);
    
    return () => clearTimeout(timer);
  }, [showIntro]);
  

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    ritual_code: "",
  });
  
  const [validity, setValidity] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
    allValid: false,
  });
  
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Validate fields
  useEffect(() => {
    const newValidity = {
      name: formData.name.length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      subject: formData.subject.length >= 3,
      message: formData.message.length >= 10,
      allValid: false,
    };
    newValidity.allValid = newValidity.name && newValidity.email && newValidity.subject && newValidity.message;
    setValidity(newValidity);
  }, [formData]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.ritual_code) return;
    if (!validity.allValid) return;
    
    setLoading(true);
    
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
        read: false,
      });
      
      setLoading(false);
      setSent(true);
      
      setTimeout(() => {
        setShowToast(true);
      }, 500);
    } catch (error) {
      const errorMessage = handleError(error, 'Contact.handleSubmit', MESSAGES.CONTACT.SEND_ERROR);
      setLoading(false);
      showError(errorMessage);
    }
  }, [formData, validity.allValid]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Ouija Board Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 0.65 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <OuijaBoardBackground 
            key={showIntro ? 'hidden' : 'visible'}
            plateUrl="/ouija_plate.jpg"
            className="w-full h-full"
            onChar={() => {}}
          />
        </motion.div>
      </div>

      {/* Spiders */}
      <SpiderField count={3} color="default" size={20} />

      {/* Intro Animation - Dollhouse style */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            style={{ overflow: 'hidden', willChange: 'transform, opacity' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              scale: 0,
              opacity: 0,
              filter: 'blur(20px)'
            }}
            transition={{ 
              duration: 1,
              exit: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {/* Cinematic text overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="relative w-full h-full flex items-center justify-center">
                {[
                  { text: 'Hi there...', delay: 0, duration: 7, isSignature: false, color: 'rgba(200, 200, 200, 0.8)' },
                  { text: 'Looking to reach us?', delay: 5, duration: 7, isSignature: false, color: 'rgba(200, 200, 200, 0.8)' },
                  { text: 'You know...', delay: 10, duration: 5, isSignature: false, color: 'rgba(200, 200, 200, 0.8)' },
                  { text: 'We love hearing from you...', delay: 14, duration: 8, isSignature: false, color: 'rgba(139, 0, 0, 0.9)' },
                  { text: 'Tell us everything.', delay: 20, duration: 6, isSignature: false, color: 'rgba(200, 200, 200, 0.8)' },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center px-8"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0, 0.1, 0.3, 0.6, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.82, 0.7, 0.5, 0.3, 0.1, 0],
                    }}
                    transition={{ 
                      delay: line.delay,
                      duration: line.duration || 4.2,
                      times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.95, 0.97, 0.99, 1],
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    <motion.p
                      className={`font-serif leading-relaxed text-center max-w-3xl ${line.isSignature ? 'text-xs italic tracking-wider' : 'text-xl md:text-2xl'}`}
                      style={{
                        color: line.color || 'rgba(200, 200, 200, 0.8)',
                        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                        letterSpacing: line.isSignature ? '0.2em' : '0.03em',
                        fontWeight: 300,
                      }}
                      initial={{ y: 40, filter: 'blur(12px)', scale: 0.92 }}
                      animate={{ 
                        y: [40, 35, 20, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -5, -15, -30, -50, -75, -100],
                        filter: [
                          'blur(12px)', 
                          'blur(8px)', 
                          'blur(4px)', 
                          'blur(1px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(0px)', 
                          'blur(2px)', 
                          'blur(6px)', 
                          'blur(15px)',
                          'blur(30px)',
                          'blur(50px)',
                          'blur(80px)'
                        ],
                        scale: [0.92, 0.95, 0.98, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06],
                      }}
                      transition={{ 
                        delay: line.delay,
                        duration: line.duration || 4.2,
                        times: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.93, 0.95, 0.97, 0.99, 1],
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      {line.text}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Vignette overlay with breathing effect */}
            <motion.div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.9) 100%)'
              }}
              animate={{
                background: [
                  'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.85) 100%)',
                  'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.95) 100%)',
                  'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.85) 100%)',
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Skip button - always visible, fades in smoothly */}
            <motion.div 
              className="fixed bottom-12 left-0 right-0 flex justify-center z-[10000] pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            >
              <motion.button
                onClick={() => setShowIntro(false)}
                className="px-6 py-3 text-sm font-serif text-zinc-400 transition-all duration-300 border border-zinc-800 hover:border-zinc-600 rounded-lg backdrop-blur-sm bg-zinc-900/30 hover:bg-zinc-800/50 pointer-events-auto cursor-pointer"
                style={{
                  textShadow: '0 0 0px transparent',
                  cursor: 'pointer',
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  textShadow: '0 0 20px rgba(200, 200, 200, 0.8), 0 0 40px rgba(200, 200, 200, 0.4)',
                  color: '#e5e5e5'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Skip to Form
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16"
      >
        <div className="w-full max-w-2xl">
          <BackButton onClick={goTo.home} variant="ghost" className="mb-10" />

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="relative p-10 rounded-xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/40 shadow-2xl"
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-zinc-800/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Title */}
                  <div className="text-center mb-12">
                    <h1 className="font-serif text-2xl font-light tracking-wider mb-4 text-zinc-100 uppercase" style={{ letterSpacing: '0.15em' }}>
                      Contact
                    </h1>
                    <p className="text-xs text-zinc-500 font-sans tracking-widest uppercase">
                      We are always listening
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="ritual_code"
                      value={formData.ritual_code}
                      onChange={handleChange}
                      style={{ position: "absolute", left: "-9999px" }}
                      tabIndex={-1}
                      aria-hidden="true"
                    />

                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      fullWidth
                    />

                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      fullWidth
                    />

                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What brings you here"
                      required
                      fullWidth
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us everything"
                      required
                      fullWidth
                    />

                    <div className="pt-6">
                      <Button
                        type="submit"
                        variant="secondary"
                        disabled={loading || !validity.allValid}
                        loading={loading}
                        className="w-full"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                      
                      <p className="text-center text-xs text-zinc-600 font-sans mt-5 tracking-widest uppercase" style={{ fontSize: '0.65rem' }}>
                        Response within 48 hours
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="relative p-12 rounded-xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/40 shadow-2xl text-center"
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-zinc-800/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 15 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-6 bg-green-500/10 border border-green-500/30"
                  >
                    <svg width="32" height="32" viewBox="0 0 40 40" className="text-green-400">
                      <path 
                        d="M10 20 L18 28 L30 12" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                  
                  <h2 className="font-serif text-2xl font-light tracking-wide mb-2 text-zinc-50">
                    Message Received
                  </h2>
                  <p className="text-zinc-400 mb-8">We'll be in touch soon</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => window.location.reload()} variant="secondary">
                    Send Another
                  </Button>
                  <Button onClick={goTo.home} variant="ghost">
                    Back to Home
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Toast
        message="Message sent successfully"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
