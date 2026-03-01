import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key, LogIn } from 'lucide-react';
import { supabase } from '../utils/supabase';

export function AdminLogin() {
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
                // Directs the HR user into the main dashboard
                navigate('/');
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white text-center">
                    <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <ShieldAlert size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">HR Administrator</h2>
                    <p className="text-teal-100">Secure access to the Virtual HR Portal.</p>
                </div>

                <form onSubmit={handleLogin} className="p-8">
                    {errorMsg && (
                        <div className="mb-4 bg-red-900/50 text-red-400 p-3 rounded-lg border border-red-800 text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-slate-300 font-semibold mb-2" htmlFor="admin-email">Admin Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LogIn size={20} className="text-slate-500" />
                            </div>
                            <input
                                id="admin-email"
                                type="email"
                                className="w-full bg-slate-900 text-slate-200 pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-slate-500"
                                placeholder="admin@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-slate-300 font-semibold mb-2" htmlFor="admin-password">Secure Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Key size={20} className="text-slate-500" />
                            </div>
                            <input
                                id="admin-password"
                                type="password"
                                className="w-full bg-slate-900 text-slate-200 pl-10 pr-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-slate-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox text-emerald-600 rounded bg-slate-900 border-slate-600" />
                            <span className="ml-2 text-slate-400 text-sm">Remember me (30 days)</span>
                        </label>
                        <a href="#" className="text-sm text-emerald-500 hover:text-emerald-400 font-semibold hover:underline">Reset access?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center transition-colors shadow-lg hover:shadow-xl border border-emerald-500"
                    >
                        Authenticate
                        <LogIn size={20} className="ml-2" />
                    </button>
                </form>

                <div className="bg-slate-900 p-6 text-center border-t border-slate-700">
                    <p className="text-slate-500 text-sm">
                        Not an administrator?{' '}
                        <button onClick={() => navigate('/user-login')} className="text-emerald-500 font-semibold hover:underline">
                            Candidate Portal
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
