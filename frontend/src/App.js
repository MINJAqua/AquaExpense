import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import LoginAlt from './components/LoginAlt';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div>
            <h1>AQUA EXPENSE</h1>
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/loginalt" element={<LoginAlt />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
