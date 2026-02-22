import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import Dashboard from "@/react-app/pages/Dashboard";
import Terms from "@/react-app/pages/Terms";
import Changelog from "@/react-app/pages/Changelog";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </Router>
  );
}
