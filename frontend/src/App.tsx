import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Landing, SignIn, SignUp, Dasboard } from "./pages/";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Entry point for the webapge  */}
        <Route path="/" element=<Landing /> />
        {/* Login && Sign Up pages  */}
        <Route path="/sign-in" element=<SignIn /> />
        <Route path="/sign-up" element=<SignUp /> />

        {/* must be protected */}
        <Route path="/dashboard" element=<Dasboard /> />
      </Routes>
    </Router>
  );
};

export default App;
