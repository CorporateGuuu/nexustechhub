'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { signInWithEmail, signInWithGoogle } from 'lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import PasskeyAuth from 'components/PasskeyAuth';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithGoogle();
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const rememberMe = formData.get('rememberMe') === 'on';

    const { error } = await signInWithEmail(
      formData.get('email') as string,
      formData.get('password') as string,
      rememberMe
    );

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      router.push(redirect);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white mb-4">Welcome Back</h1>
          <p className="text-white/60">Access wholesale pricing & bulk orders</p>
        </div>

        {/* Passkey Login */}
        <PasskeyAuth mode="login" />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black text-white/40">or</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black font-bold text-xl py-5 rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-105 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : <svg className="w-7 h-7" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.38-.81 2.39-2.33 3.36v2.98h3.77c2.21-2.04 3.48-5.05 3.48-8.35z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.77-2.98c-1.08.73-2.46 1.15-4.16 1.15-3.2 0-5.91-2.16-6.88-5.07H.96v3.03C2.91 20.87 6.84 23 12 23z"/>
            <path fill="#FBBC05" d="M5.12 14.09c-.24-.72-.38-1.49-.38-2.09s.14-1.37.38-2.09V6.97H.96C.35 8.85.00 10.47.00 12s.35 1.65.96 3.03l4.16-.94z"/>
            <path fill="#EA4335" d="M12 4.85c1.76 0 3.34.61 4.58 1.81l3.42-3.42C17.95.91 15.24 0 12 0 6.84 0 2.91 2.13.96 6.03l4.16.94C6.09 4.94 8.8 4.85 12 4.85z"/>
          </svg>}
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black text-white/40">or</span>
          </div>
        </div>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            required
            placeholder="business@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                name="rememberMe"
                className="w-6 h-6 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-white/80 text-lg">Remember me</span>
            </label>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 text-lg">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xl py-6 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'LOGIN WITH EMAIL'}
          </button>
        </form>

        {/* Register with Biometrics */}
        <div className="my-8 text-center text-white/40">or register with biometrics</div>
        <PasskeyAuth mode="register" />
      </div>
    </div>
  );
}
