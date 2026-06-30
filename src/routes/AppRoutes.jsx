import { Routes, Route } from "react-router-dom";

// PUBLIC PAGES
import Home from "@public-site/pages/Home";
import ProjectDetails from "../public-site-visitor-UI/pages/ProjectDetails"

// ADMIN PAGES
import AdminLogin from "../admin-dashboard/pages/AdminLogin";
import DashboardPage from "../admin-dashboard/pages/Dashboard";
import ProjectsPage from "../admin-dashboard/pages/Projects";
import MessagesPage from "../admin-dashboard/pages/Messages";
import SettingsPage from "../admin-dashboard/pages/Settings";

// ROUTE GUARD
import ProtectedRoute from "../routes/ProtectedRoute";

const AppRoutes = () => {
  return (
      <Routes>

        {/* Public Website */}
        <Route
          path="/" element={<Home />} />

        <Route
          path="/projects/:id" element={<ProjectDetails />} />

        {/* Admin Login */}
        <Route
          path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Area */}
        <Route
          path="/admin" element={ <ProtectedRoute>
              <DashboardPage /> 
              </ProtectedRoute> } />

        <Route
          path="/admin/projects"
          element={ <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute> } />

        <Route
          path="/admin/messages"
          element={ <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute> } />

        <Route
          path="/admin/settings"
          element={ <ProtectedRoute>
              <SettingsPage /> 
              </ProtectedRoute> } />

      </Routes>
  );
};

export default AppRoutes;