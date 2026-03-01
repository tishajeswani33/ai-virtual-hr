import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, MessageSquare, LogOut, Mic, BrainCircuit } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { cn } from '../utils/cn';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
      )
    }
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    <span className="font-medium text-sm">{label}</span>
  </NavLink>
);

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/employees': return 'Employee Directory';
      case '/candidates': return 'Recruitment Pipeline';
      case '/ai-assistant': return 'AI HR Assistant';
      case '/interview': return 'AI Voice Interview';
      default: return 'VirtuHR';
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        {/* Logo */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-200">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-800">VirtuHR</span>
              <p className="text-xs text-slate-400">AI-Powered Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 py-6 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3">Main Menu</p>
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/employees" icon={Users} label="Employees" />
          <SidebarItem to="/candidates" icon={UserPlus} label="Recruitment" />
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3 mt-6">AI Tools</p>
          <SidebarItem to="/ai-assistant" icon={MessageSquare} label="AI Assistant" />
          <SidebarItem to="/interview" icon={Mic} label="Voice Interview" />
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{getPageTitle()}</h1>
            <p className="text-xs text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">HR Admin</p>
                <p className="text-xs text-slate-500">Head of HR</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">
                HR
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
