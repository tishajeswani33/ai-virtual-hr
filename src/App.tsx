import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HRProvider } from './context/HRContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Candidates } from './pages/Candidates';
import { AIAssistant } from './pages/AIAssistant';
import { VoiceInterview } from './pages/VoiceInterview';
import { UserLogin } from './pages/UserLogin';
import { AdminLogin } from './pages/AdminLogin';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <HRProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes - no sidebar */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<SignUp />} />

          {/* App Routes - with sidebar layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="interview" element={<VoiceInterview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HRProvider>
  );
}

export default App;
