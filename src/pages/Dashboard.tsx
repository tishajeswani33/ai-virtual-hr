import { useHR } from '../context/HRContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, Briefcase, UserPlus, TrendingUp, Award, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'];

const stageBadgeColors: Record<string, string> = {
  Applied: 'bg-slate-100 text-slate-600',
  Screening: 'bg-yellow-100 text-yellow-700',
  Interview: 'bg-blue-100 text-blue-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
};

const StatCard = ({ title, value, icon: Icon, gradient, trend, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-1 text-slate-800">{value}</h3>
        {trend && (
          <p className="text-green-500 text-xs mt-2 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${gradient}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

export const Dashboard = () => {
  const { stats, employees, candidates } = useHR();
  const navigate = useNavigate();

  const deptData = employees.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.name === curr.department);
    if (existing) existing.value += 1;
    else acc.push({ name: curr.department, value: 1 });
    return acc;
  }, []);

  const stageData = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((stage) => ({
    name: stage,
    count: candidates.filter((c) => c.stage === stage).length,
  }));

  const recentEmployees = [...employees].slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value={stats.totalEmployees} icon={Users} gradient="bg-indigo-500" trend="+2 this month" delay={0} />
        <StatCard title="Open Positions" value={stats.openPositions} icon={Briefcase} gradient="bg-purple-500" delay={0.1} />
        <StatCard title="Active Candidates" value={stats.activeCandidates} icon={UserPlus} gradient="bg-pink-500" trend="+5 this week" delay={0.2} />
        <StatCard title="Avg Performance" value={`${stats.avgPerformance}/5`} icon={Award} gradient="bg-teal-500" trend="Top 10%" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <h3 className="text-base font-semibold mb-1 text-slate-800">Employee Distribution</h3>
          <p className="text-xs text-slate-400 mb-6">By department</p>
          {deptData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-300">
              <Users className="w-12 h-12 mb-2" />
              <p className="text-sm">No employee data yet</p>
              <button onClick={() => navigate('/employees')} className="mt-3 text-xs text-indigo-500 hover:underline">Add Employees →</button>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deptData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                    {deptData.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val} employees`, 'Count']} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Recruitment Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <h3 className="text-base font-semibold mb-1 text-slate-800">Recruitment Pipeline</h3>
          <p className="text-xs text-slate-400 mb-6">Candidates per stage</p>
          {candidates.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-300">
              <UserPlus className="w-12 h-12 mb-2" />
              <p className="text-sm">No candidates yet</p>
              <button onClick={() => navigate('/candidates')} className="mt-3 text-xs text-indigo-500 hover:underline">Add Candidates →</button>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="count" name="Candidates" radius={[6, 6, 0, 0]}>
                    {stageData.map((_: any, index: number) => (
                      <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Recent Employees</h3>
              <p className="text-xs text-slate-400">Latest additions to the team</p>
            </div>
            <button onClick={() => navigate('/employees')} className="text-xs text-indigo-600 hover:underline font-medium flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentEmployees.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">No employees added yet.</p>
            ) : (
              recentEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{emp.name}</p>
                    <p className="text-xs text-slate-400 truncate">{emp.role} · {emp.department}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                    emp.status === 'Remote' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                    {emp.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Candidates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-800">Active Candidates</h3>
              <p className="text-xs text-slate-400">Top candidates in pipeline</p>
            </div>
            <button onClick={() => navigate('/candidates')} className="text-xs text-indigo-600 hover:underline font-medium flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {candidates.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">No candidates in pipeline yet.</p>
            ) : (
              candidates.slice(0, 5).map((candidate) => (
                <div key={candidate.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{candidate.name}</p>
                    <p className="text-xs text-slate-400 truncate">{candidate.role}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${stageBadgeColors[candidate.stage]}`}>
                    {candidate.stage}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white"
      >
        <h3 className="text-lg font-bold mb-1">Quick Actions</h3>
        <p className="text-indigo-200 text-sm mb-5">Jump right into your most common tasks</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Employee', icon: Users, path: '/employees' },
            { label: 'Add Candidate', icon: UserPlus, path: '/candidates' },
            { label: 'AI Assistant', icon: MessageSquare, path: '/ai-assistant' },
            { label: 'Voice Interview', icon: Clock, path: '/interview' },
          ].map(({ label, icon: Icon, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm border border-white/10 group"
            >
              <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
