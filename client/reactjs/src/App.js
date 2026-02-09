import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
// import Chat from "./components/Chat";
import Auth from "./pages/auth";
import chat from "./pages/Chat";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // tailwind
// import Chat from "./components/chat";

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
></link>;

// I removed the second import line because it was causing a naming conflict

function App() {
  return (
    <Router>
      <Routes>
        {/* It is standard to use lowercase paths */}
        {/* <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} /> */}

        <Route path="/" element={<Auth />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/chat" element={<chat />} />

        {/* <Route path="/chat" element={<Chat />} /> */}

        {/* <Route path="/" element={<Chat />} /> */}

        {/* You usually want a default home route as well */}
        {/* <Route path="/" element={<h1>Welcome to the App</h1>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
