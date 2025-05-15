// App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Landing, SignIn, SignUp, Dasboard } from "./pages/";
import DashboardLayout from "./Layout/DashboardLayout";
import { CodeSync, Profile, RunCode } from "./pages/secure/";
import ErrorBoundary from "./Layout/ErrorBoundary";
import ProtectedRoute from "./Layout/protectedRoutes";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />z
          <Route path="/sign-up" element={<SignUp />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dasboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="codeSync" element={<CodeSync />} />
              <Route path="run" element={<RunCode />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
