import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabase';

export function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        if (email && password) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setErrorMsg(error.message);
            } else if (data.user) {
                // Authenticated successfully! Route to dashboard
                navigate('/');
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 p-8 text-white text-center">
                    <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Candidate Login</h2>
                    <p className="text-indigo-100">Sign in to track your applications and interviews.</p>
                </div>

                <form onSubmit={handleLogin} className="p-8">
                    {errorMsg && (
                        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-slate-700 font-semibold mb-2" htmlFor="email">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={20} className="text-slate-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="candidate@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-slate-700 font-semibold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={20} className="text-slate-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox text-indigo-600 rounded" />
                            <span className="ml-2 text-slate-600 text-sm">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center transition-colors shadow-lg hover:shadow-xl"
                    >
                        Sign In
                        <ArrowRight size={20} className="ml-2" />
                    </button>
                </form>

                <div className="bg-slate-50 p-6 text-center border-t border-slate-100 flex flex-col gap-2">
                    <p className="text-slate-600 text-sm">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/signup')} className="text-indigo-600 font-semibold hover:underline">
                            Sign up
                        </button>
                    </p>
                    <p className="text-slate-600 text-sm">
                        Are you an HR Administrator?{' '}
                        <button onClick={() => navigate('/admin-login')} className="text-indigo-600 font-semibold hover:underline">
                            Admin Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
