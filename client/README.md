🧾 CoderzHub Project Structure & Progress Report
📦 Tech Stack
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  |  | 
|  | <Outlet /> | 
|  |  | 
|  |  | 



📁 Full Folder Structure
server/ – Backend
server/
├── config/              # ✅ db.js created
├── controllers/         # ✅ authController.js, adminController.js, userController.js
├── middleware/          # ✅ authMiddleware.js, roleMiddleware.js
├── models/              # ✅ User.js schema
├── routes/              # ✅ authRoutes.js, adminRoutes.js, userRoutes.js
├── utils/               # ✅ generateToken.js
├── .env                 # ✅ contains DB URI and JWT secret
└── server.js            # ✅ Express app entry point


client/src/ – Frontend
client/src/
├── main.jsx             # ✅ React entry point
├── index.css            # ✅ Tailwind directives added
├── App.jsx              # ✅ Route definitions with <Outlet />
├── layout/
│   └── RootLayout.jsx   # ✅ Shared layout with Navbar/Footer
├── components/
│   ├── Navbar.jsx       # ✅ Basic header
│   ├── Footer.jsx       # ✅ Basic footer
│   ├── Sidebar.jsx      # ⬜ To be styled and wired
│   ├── ToolCard.jsx     # ⬜ To be designed for tool previews
│   └── ProtectedRoute.jsx # ✅ Role-based route wrapper
├── context/
│   └── AuthContext.jsx  # ✅ Stores user, role, token
├── hooks/
│   └── useRole.js       # ✅ Custom hook for role access
├── services/
│   ├── authService.js   # ✅ Login/register API calls
│   ├── userService.js   # ⬜ To be implemented
│   └── adminService.js  # ⬜ To be implemented
├── pages/
│   ├── SignIn/
│   │   └── SignIn.jsx   # ✅ Login form
│   ├── Admin/
│   │   ├── Dashboard.jsx      # ⬜ UI pending
│   │   ├── ManageUsers.jsx    # ⬜ Logic pending
│   │   ├── FeaturedTools.jsx  # ⬜ UI pending
│   │   └── Profile.jsx        # ⬜ Basic layout needed
│   ├── User/
│   │   ├── Dashboard.jsx      # ⬜ Basic layout needed
│   │   ├── MyTools.jsx        # ⬜ Tool history logic
│   │   └── Profile.jsx        # ⬜ UI pending
│   └── Tools/
│       ├── UUIDGenerator.jsx        # ⬜ Tool logic pending
│       ├── JSONFormatter.jsx        # ⬜ Tool logic pending
│       ├── SpaceRemover.jsx         # ⬜ Tool logic pending
│       ├── Base64Tool.jsx           # ⬜ Tool logic pending
│       ├── ImageConverter.jsx       # ⬜ Tool logic pending
│       ├── ColorPicker.jsx          # ⬜ Tool logic pending
│       └── TextCaseConverter.jsx    # ⬜ Tool logic pending



✅ What’s Done
- ✅ Folder structure scaffolded (via PowerShell script)
- ✅ Tailwind + MUI integration confirmed
- ✅ Role-based routing with <Outlet /> layout
- ✅ AuthContext and JWT logic wired
- ✅ ESLint + Prettier configured
- ✅ Basic Navbar/Footer created
- ✅ Backend routes and middleware structured
