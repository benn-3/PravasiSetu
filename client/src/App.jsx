import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import SkillProfile from './pages/worker/SkillProfile';
import JobMatches from './pages/worker/JobMatches';
import WorkHistory from './pages/worker/WorkHistory';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import Applicants from './pages/employer/Applicants';
import EmployerMatches from './pages/employer/EmployerMatches';
import OfficerDashboard from './pages/officer/OfficerDashboard';
import VerificationQueue from './pages/officer/VerificationQueue';
import DistrictDashboard from './pages/officer/DistrictDashboard';
import StateAnalytics from './pages/admin/StateAnalytics';
import MigrationHeatmap from './pages/admin/MigrationHeatmap';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes - Standalone */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Routes - With Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Worker Routes */}
          <Route element={<ProtectedRoute allowedRoles={['worker']} />}>
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
            <Route path="/skill-profile" element={<SkillProfile />} />
            <Route path="/job-matches" element={<JobMatches />} />
            <Route path="/work-history" element={<WorkHistory />} />
          </Route>

          {/* Employer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/job/:id/applicants" element={<Applicants />} />
            <Route path="/job/:id/matches" element={<EmployerMatches />} />
          </Route>

          {/* Officer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['officer', 'admin']} />}>
            <Route path="/officer-dashboard" element={<OfficerDashboard />} />
            <Route path="/verification-queue" element={<VerificationQueue />} />
            <Route path="/district-dashboard" element={<DistrictDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<StateAnalytics />} /> {/* reusing analytics as dashboard */}
            <Route path="/analytics" element={<StateAnalytics />} />
            <Route path="/heatmap" element={<MigrationHeatmap />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
