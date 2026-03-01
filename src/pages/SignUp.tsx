import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, UserPlus, Mail } from 'lucide-react';
import { supabase } from '../utils/supabase';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (email) {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            });

            setLoading(false);

            if (error) {
                setErrorMsg(error.message);
            } else {
                setSuccessMsg('Registration successful! Please check your email inbox for a magic link to sign in.');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        setErrorMsg('');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            }
        });
        if (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 p-8 text-white text-center">
                    <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-indigo-100">Join the Virtual HR platform to track your applications.</p>
                </div>

                <div className="p-8 pb-4">
                    {errorMsg && (
                        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 text-sm">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 text-sm">
                            {successMsg}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-lg flex justify-center items-center transition-colors shadow-sm mb-6"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center mb-6">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="px-4 text-sm text-slate-400 font-medium">Or continue with Email</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    <form onSubmit={handleEmailSignUp}>
                        <div className="mb-4">
                            <label className="block text-slate-700 font-semibold mb-2" htmlFor="fullName">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={20} className="text-slate-400" />
                                </div>
                                <input
                                    id="fullName"
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="Jane Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-slate-700 font-semibold mb-2" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-slate-400" />
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center transition-colors shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Sending Magic Link...' : 'Continue with Email'}
                            {!loading && <ArrowRight size={20} className="ml-2" />}
                        </button>
                    </form>
                </div>

                <div className="bg-slate-50 p-6 text-center border-t border-slate-100 flex flex-col gap-2">
                    <p className="text-slate-600 text-sm">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/user-login')} className="text-indigo-600 font-semibold hover:underline">
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
