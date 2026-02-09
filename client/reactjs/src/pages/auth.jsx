import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        await api.post("/auth/register", form);
        setIsSignup(false);
        setForm({ username: "", email: "", password: "" });
      } else {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setForm({ username: "", email: "", password: "" });
  };

  return (
    /* Changed min-h-screen to min-h-[100dvh] for better mobile browser support */
    <div className="min-h-[100dvh] w-full flex items-center justify-center px-4 py-8 font-['Poppins'] bg-[#f8fafc] relative overflow-hidden">
      
      {/* Background Glows: Optimized for wide screens */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2 
              key={isSignup ? "signup-title" : "login-title"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold text-slate-900 mb-2 tracking-tight"
            >
              {isSignup ? "Create Account" : "Welcome Back"}
            </motion.h2>
            <p className="text-slate-500 text-sm font-medium">
              {isSignup ? "Join the Techwagera AI network" : "Enter your credentials to continue"}
            </p>
          </div>

          {/* Error Alert */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-2xl mb-6 text-xs font-semibold overflow-hidden"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {isSignup && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                  required
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none p-3.5 pl-12 rounded-2xl text-slate-900 transition-all placeholder:text-slate-400 text-base"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                name="email"
                type="email"
                inputMode="email"
                placeholder="Email Address"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none p-3.5 pl-12 rounded-2xl text-slate-900 transition-all placeholder:text-slate-400 text-base"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none p-3.5 pl-12 rounded-2xl text-slate-900 transition-all placeholder:text-slate-400 text-base"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              disabled={loading}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-2xl font-semibold transition-all shadow-xl shadow-slate-200"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  {isSignup ? "Create Account" : "Sign In"}
                  <ArrowRight size={18} className="ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {isSignup ? "Already a member?" : "New to the platform?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-blue-600 font-bold hover:text-blue-700 transition-colors underline-offset-4 hover:underline focus:outline-none"
              >
                {isSignup ? "Log In" : "Register Now"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;