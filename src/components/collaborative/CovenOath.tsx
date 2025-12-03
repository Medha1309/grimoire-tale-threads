/**
 * Coven Oath - Corrupted EULA for Tale Threads
 * Users must agree before accessing the Digital Forensic Archive
 */

import React, { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';

interface CovenOathProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const CovenOath: React.FC<CovenOathProps> = ({ isOpen, onAccept, onDecline }) => {
  const [glitchText, setGlitchText] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canAccept, setCanAccept] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Random glitch effect
      const glitchInterval = setInterval(() => {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 100);
      }, 3000 + Math.random() * 2000);

      return () => clearInterval(glitchInterval);
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollProgress(scrollPercentage);
    
    // Enable accept button when scrolled to bottom
    if (scrollPercentage > 95) {
      setCanAccept(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onDecline}
      title=""
      size="lg"
      className="bg-black border-2 border-red-900/50"
    >
      <div className="relative">
        {/* Corrupted header */}
        <div className="text-center mb-6 relative">
          <div 
            className={`font-mono text-2xl font-bold transition-all duration-100 ${
              glitchText ? 'text-red-500 blur-sm' : 'text-red-400'
            }`}
            style={{
              textShadow: glitchText 
                ? '2px 2px #ff0000, -2px -2px #00ff00' 
                : '1px 1px rgba(239, 68, 68, 0.5)',
            }}
          >
            ⚠ COVEN OATH ⚠
          </div>
          <div className="text-xs font-mono text-slate-500 mt-2 tracking-widest">
            DIGITAL FORENSIC ARCHIVE • ACCESS AGREEMENT
          </div>
        </div>

        {/* Corrupted document content */}
        <div 
          className="h-96 overflow-y-auto px-6 py-4 bg-slate-950/80 border border-red-900/30 rounded font-mono text-sm space-y-4 custom-scrollbar"
          onScroll={handleScroll}
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239, 68, 68, 0.03) 2px, rgba(239, 68, 68, 0.03) 4px)',
          }}
        >
          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§1. ACKNOWLEDGMENT OF CORRUPTION</p>
            <p className="text-slate-400 text-xs">
              By accessing this Digital Forensic Archive, you acknowledge that <span className="text-red-400">THE CHAIN IS CURSED</span>. 
              All data within this system exists in a state of controlled decay. Integrity is maintained through collective vigilance, 
              but corruption is inevitable.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§2. NO TURNING BACK</p>
            <p className="text-slate-400 text-xs">
              Once a segment is committed to the Chain, it becomes <span className="text-amber-400">IMMUTABLE</span>. 
              The archive does not forget. The archive does not forgive. Your contributions are permanently stamped 
              with cryptographic hashes and cannot be erased.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§3. SYSTEM OVERRIDE AUTHORITY</p>
            <p className="text-slate-400 text-xs">
              The Chain Master possesses <span className="text-red-400">SYSTEM OVERRIDE VETO</span> authority. 
              Any proposal may be instantly rejected with the designation "Anomaly Detected: Chain Integrity Check Failed." 
              This action is final and logged permanently in the audit trail.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§4. GHOST SEGMENT PROTOCOL</p>
            <p className="text-slate-400 text-xs">
              During Digital Séance sessions, the system reserves the right to inject <span className="text-purple-400">GHOST SEGMENTS</span> 
              at random intervals (approximately 10% of turns). These 2-3 word fragments appear without warning and cannot be edited. 
              You must continue the narrative from these system-generated intrusions.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§5. THE TURN CURSE</p>
            <p className="text-slate-400 text-xs">
              In Digital Séance mode, you have <span className="text-amber-400">5 MINUTES</span> to complete your segment. 
              Failure to submit within this window results in <span className="text-red-400">PERMANENT DISCONNECTION</span> from the session. 
              Your name will fade to broken gray, and the message "[Your Name] was lost to the chain" will be broadcast to all participants.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§6. INTEGRITY INDEX MONITORING</p>
            <p className="text-slate-400 text-xs">
              All projects are continuously monitored via the <span className="text-green-400">INTEGRITY INDEX</span> (0-100). 
              This metric tracks Chain cohesion and merge latency. When the index falls below 50, the Chain enters 
              <span className="text-red-400"> CRITICAL STATUS</span> and may become unstable.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§7. HASH VERIFICATION</p>
            <p className="text-slate-400 text-xs">
              Every committed segment is assigned a cryptographic hash (djb2 algorithm). These hashes are visible 
              to all participants and serve as proof of authenticity. Tampering with committed content will cause 
              hash mismatches and trigger <span className="text-red-400">CORRUPTION ALERTS</span>.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed">
            <p className="text-red-400 font-semibold mb-2">§8. CANONICAL HAUNTING</p>
            <p className="text-slate-400 text-xs">
              When a proposal is merged into the Canonical Chain, it undergoes the <span className="text-purple-400">SEARING RITUAL</span>. 
              The content is permanently stamped with its hash and becomes part of the immutable archive. 
              This process is irreversible.
            </p>
          </section>

          <section className="text-slate-300 leading-relaxed border-t border-red-900/30 pt-4 mt-6">
            <p className="text-red-400 font-semibold mb-2">§9. ACCEPTANCE OF TERMS</p>
            <p className="text-slate-400 text-xs">
              By clicking "I ACCEPT THE OATH" below, you acknowledge that you have read, understood, and agree to be bound by 
              these terms. You accept the risks inherent in participating in a corrupted digital archive. 
              You understand that <span className="text-red-400">the Chain is cursed</span>, and you willingly enter the Coven.
            </p>
          </section>

          <div className="text-center py-8 text-xs text-slate-600 font-mono">
            <p>⸸ SCROLL TO BOTTOM TO PROCEED ⸸</p>
            <p className="mt-2">ARCHIVE VERSION 1.0.0 • INTEGRITY PROTOCOL ACTIVE</p>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="mt-4 mb-2">
          <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 font-mono mt-1 text-center">
            {scrollProgress < 95 ? 'Scroll to continue...' : 'Ready to proceed'}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="ghost"
            onClick={onDecline}
            className="flex-1 border-slate-700 text-slate-400 hover:text-slate-200"
          >
            DECLINE & EXIT
          </Button>
          <Button
            variant="primary"
            onClick={onAccept}
            disabled={!canAccept}
            className={`flex-1 ${
              canAccept 
                ? 'bg-red-600 hover:bg-red-700 border-red-500' 
                : 'bg-slate-800 border-slate-700 cursor-not-allowed opacity-50'
            }`}
          >
            {canAccept ? 'I ACCEPT THE OATH' : 'SCROLL TO ACCEPT'}
          </Button>
        </div>

        {/* Glitch overlay */}
        {glitchText && (
          <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse" />
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}</style>
    </Modal>
  );
};

/**
 * Hook to manage Coven Oath acceptance
 */
export function useCovenOath() {
  const [hasAccepted, setHasAccepted] = useState(() => {
    return localStorage.getItem('covenOathAccepted') === 'true';
  });

  const acceptOath = () => {
    localStorage.setItem('covenOathAccepted', 'true');
    localStorage.setItem('covenOathAcceptedAt', new Date().toISOString());
    setHasAccepted(true);
  };

  const resetOath = () => {
    localStorage.removeItem('covenOathAccepted');
    localStorage.removeItem('covenOathAcceptedAt');
    setHasAccepted(false);
  };

  return { hasAccepted, acceptOath, resetOath };
}
