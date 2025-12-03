import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavigationProps } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { AuthBackground } from "../components/auth/AuthBackground";
import { Button as UIButton, Input, Alert } from "../components/ui";
import { BackButton } from "../components/shared/Button";
import { useAuthEffects } from "../hooks/useAuthEffects";
import { typography, buttons, inputs, cards, backgrounds } from "../utils/themeClasses";

interface LoginProps extends NavigationProps {}

export const Login: React.FC<LoginProps> = ({ go }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [shake, setShake] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const { login, resetPassword } = useAuth();
  const { cursorPos, delayedCursor, glitch } = useAuthEffects();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(formData.email, formData.password);
      setSignedIn(true);
      setTimeout(() => go("stories"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to log in");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };



  const handleResetPassword = async () => {
    if (!formData.email) return setError("Please enter your email address");
    try {
      setLoading(true);
      setError("");
      await resetPassword(formData.email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black auth-page">
      <AuthBackground 
        cursorPos={cursorPos} 
        delayedCursor={delayedCursor} 
        isSuccess={signedIn}
        spectralWords={['remember', 'enter', 'return', 'welcome back']}
      />

      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 2, ease: 'easeOut' }} 
        className="relative z-20 flex items-center justify-center min-h-screen px-6 py-16"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }} 
          transition={{ duration: 1.5, ease: 'easeOut', x: { duration: 0.5 } }} 
          className="w-full max-w-md"
        >
          <BackButton onClick={() => go("landing")} className="mb-10 relative" />

          <motion.div 
            className={`relative p-10 rounded-xl backdrop-blur-xl transition-all ${glitch ? 'translate-x-1 blur-[0.5px]' : ''}`} 
            style={{ 
              background: 'rgba(24, 24, 27, 0.7)',
              border: '1px solid rgba(63, 63, 70, 0.4)', 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' 
            }}
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-zinc-800/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center mb-12"
              >
                <h1 className="font-serif text-2xl font-light tracking-wider mb-4 text-zinc-100 uppercase" style={{ letterSpacing: '0.15em' }}>
                  Welcome Back
                </h1>
                <p className="text-xs text-zinc-500 font-sans tracking-widest uppercase">
                  Continue your journey
                </p>
              </motion.div>

              <Alert message={error} type="error" isVisible={!!error} />
              <Alert message="Password reset email sent" type="success" isVisible={resetSent} />

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                  label="Email" 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="your@email.com"
                  fullWidth
                />

                <Input 
                  label="Password" 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••"
                  fullWidth
                />

                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleResetPassword} 
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200 font-sans tracking-wide"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="pt-6">
                  <UIButton type="submit" variant="auth" loading={loading} className="w-full">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </UIButton>
                </div>
              </form>

              <div className="mt-8 text-center text-sm font-sans text-zinc-500">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  onClick={() => go("signup")} 
                  className="text-zinc-300 hover:text-zinc-100 transition-colors duration-200 font-medium"
                >
                  Sign up
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
