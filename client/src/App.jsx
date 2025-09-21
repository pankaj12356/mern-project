// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home/Home';
// import SignIn from './pages/SignIn/SignIn';
// // import AdminDashboard from './pages/Admin/Dashboard';
// import UserDashboard from './pages/User/Dashboard';
// import UUIDGenerator from './pages/Tools/UUIDGenerator';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public route — accessible to everyone */}
          <Route index element={<Home />} />
{/* 
          
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="tools/uuid" element={<UUIDGenerator />} />
          </Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;