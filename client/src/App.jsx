// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import AdminDashboard from './pages/Admin/Dashboard';
// import UserDashboard from './pages/User/Dashboard';
// import UUIDGenerator from './pages/Tools/UUIDGenerator';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './pages/User/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public route — accessible to everyone */}
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />
          
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
            <Route path="user/dashboard" element={<UserDashboard />} />
            
            {/* <Route path="tools/uuid" element={<UUIDGenerator />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;