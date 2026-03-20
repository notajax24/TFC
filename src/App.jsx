import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";

import LandingPage from "./Components/Pages/LandingPage";
import UserDashboard from "./Components/Pages/UserDashboard";
import AdminDashboard from "./Components/Pages/AdminDashboard";

// Standard protection (Must be logged in)
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Strict Admin protection (Must be logged in AND have the admin role)
const AdminRoute = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center text-orange-500 font-black">VERIFYING CREDENTIALS...</div>;

  // Check the public metadata we just set in the Clerk Dashboard!
  if (user?.publicMetadata?.role === "admin") {
    return children;
  }

  // If they are not an admin, kick them back to the regular user dashboard
  return <Navigate to="/dashboard" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Regular Members go here */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* ONLY Admins go here */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}