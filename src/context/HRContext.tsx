import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Remote';
  joinDate: string;
  salary: number;
  performance: number; // 1-5
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  score: number;
  email: string;
  phone: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface HRContextType {
  employees: Employee[];
  candidates: Candidate[];
  messages: Message[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  updateCandidate: (id: string, data: Partial<Candidate>) => void;
  moveCandidateStage: (id: string, stage: Candidate['stage']) => void;
  sendMessage: (text: string) => void;
  stats: {
    totalEmployees: number;
    openPositions: number;
    activeCandidates: number;
    avgPerformance: number;
  };
}

const HRContext = createContext<HRContextType | undefined>(undefined);

// Use environment variable for API URL in production, fallback to localhost for dev
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const HRProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', sender: 'ai', text: 'Hello! I am your AI HR Assistant. Ask me about employee stats, policies, or candidates.', timestamp: new Date() }
  ]);

  // Fetch initial data
  useEffect(() => {
    fetch(`${API_BASE}/employees`)
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Error fetching employees:", err));

    fetch(`${API_BASE}/candidates`)
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error("Error fetching candidates:", err));
  }, []);

  // AI Logic
  const generateAIResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let responseText = "I'm not sure about that. Try asking about employee counts, departments, or specific candidates.";

    if (lowerQuery.includes('how many employees') || lowerQuery.includes('count')) {
      responseText = `We currently have ${employees.length} active employees across ${new Set(employees.map(e => e.department)).size} departments.`;
    } else if (lowerQuery.includes('salary') || lowerQuery.includes('paid')) {
      const avgSalary = employees.length ? Math.round(employees.reduce((acc, curr) => acc + curr.salary, 0) / employees.length) : 0;
      responseText = `The average salary in the company is $${avgSalary.toLocaleString()}.`;
    } else if (lowerQuery.includes('policy') || lowerQuery.includes('leave')) {
      responseText = "Our standard leave policy allows for 20 days of PTO per year. Remote work is supported for most engineering and product roles.";
    } else if (lowerQuery.includes('hiring') || lowerQuery.includes('candidates')) {
      responseText = `We have ${candidates.length} active candidates in the pipeline. ${candidates.filter(c => c.stage === 'Offer').length} offer(s) are currently out.`;
    } else if (lowerQuery.includes('performance')) {
      if (employees.length > 0) {
        const topPerformer = employees.reduce((prev, current) => (prev.performance > current.performance) ? prev : current);
        responseText = `The average performance score is ${(employees.reduce((acc, curr) => acc + curr.performance, 0) / employees.length).toFixed(1)}. Our top performer is ${topPerformer.name}.`;
      } else {
        responseText = `No performance data available yet.`;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: responseText, timestamp: new Date() }]);
    }, 800);
  };

  const sendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text, timestamp: new Date() }]);
    generateAIResponse(text);
  };

  const addEmployee = async (data: Omit<Employee, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const newEmployee = await res.json();
      setEmployees(prev => [...prev, newEmployee]);
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  const updateEmployee = async (id: string, data: Partial<Employee>) => {
    try {
      const res = await fetch(`${API_BASE}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const updatedEmployee = await res.json();
      setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await fetch(`${API_BASE}/employees/${id}`, { method: 'DELETE' });
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const addCandidate = async (data: Omit<Candidate, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const newCandidate = await res.json();
      setCandidates(prev => [...prev, newCandidate]);
    } catch (err) {
      console.error("Error adding candidate:", err);
    }
  };

  const updateCandidate = async (id: string, data: Partial<Candidate>) => {
    try {
      const res = await fetch(`${API_BASE}/candidates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const updatedCandidate = await res.json();
      setCandidates(prev => prev.map(cand => cand.id === id ? updatedCandidate : cand));
    } catch (err) {
      console.error("Error updating candidate:", err);
    }
  };

  const moveCandidateStage = (id: string, stage: Candidate['stage']) => {
    updateCandidate(id, { stage });
  };

  const stats = {
    totalEmployees: employees.length,
    openPositions: 12, // Mocked
    activeCandidates: candidates.length,
    avgPerformance: employees.length ? Number((employees.reduce((acc, curr) => acc + curr.performance, 0) / employees.length).toFixed(1)) : 0,
  };

  return (
    <HRContext.Provider value={{
      employees, candidates, messages,
      addEmployee, updateEmployee, deleteEmployee,
      addCandidate, updateCandidate, moveCandidateStage,
      sendMessage, stats
    }}>
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (context === undefined) {
    throw new Error('useHR must be used within a HRProvider');
  }
  return context;
};
