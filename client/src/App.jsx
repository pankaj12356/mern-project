import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import AdminDashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './pages/User/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />

          {/* Protected admin route */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Protected user route */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['user', 'admin', 'student', 'mentor', 'guest']} />
            }
          >
            <Route path="user/dashboard" element={<UserDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
