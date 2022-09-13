import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// <>
//   <Router>
//     <div className="App">
//       <div>
//         <h1>AQUA EXPENSE</h1>
//       </div>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </div>
//   </Router>
// </>
