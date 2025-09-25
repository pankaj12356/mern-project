import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import AdminDashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './pages/User/Dashboard';
import UuidTool from './pages/Tools/UUIDGenerator';
import ToolsDashboard from './pages/Tools/ToolDashBoard';
import JsonFormatter from './pages/tools/JSONFormatter';
import JwtDecoder from './pages/tools/JwtDecoder';
import SpaceRemover from './pages/Tools/SpaceRemover';
import Base64Converter from './pages/Tools/Base64Tool';
import ImageCompressor from './pages/Tools/ImageConmpressor';
import ImageTypeConverter from './pages/Tools/ImageTypeConverter';
import SetupCommandsPage  from './pages/Code/SetupCommandsPage';
import { Build, Code } from '@mui/icons-material';

import AboutUs from './pages/AboutUs/AboutUs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="about" element={<AboutUs />} />

          {/* Protected admin route */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Protected user route */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={['user', 'admin', 'student','employee', 'mentor', 'corporation', 'guest']}
              />
            }
          >
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="/tools" element={<ToolsDashboard />} />
            <Route path="/tools/uuid" element={<UuidTool />} />
            <Route path="/tools/json" element={<JsonFormatter />} />
            <Route path="/tools/space" element={<SpaceRemover />} />
            <Route path="/tools/jwt" element={<JwtDecoder />} />
            <Route path="/tools/base64" element={<Base64Converter />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />}/>    
            <Route path="/tools/image-type-converter" element={<ImageTypeConverter />}/>
            <Route path="/code" element={<SetupCommandsPage />}/>

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
