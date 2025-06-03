import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Registrationform from './components/Registrationform';
import ChargerPage from './components/ChargerPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {isAuthPage ? (
        <div className="split-screen">
          <div className="left-panel">
            <div className="illustration">
              <img
                src="./src/assets/evcharging.png"
                alt="EV charging illustration"
                style={{ width: '60%', maxWidth: '300px', marginBottom: '20px' }}
              />
              <h2>EVOLT Charging</h2>
              <p>Smart solutions for EV car charging stations</p>
            </div>
          </div>
          <div className="right-panel">
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<Registrationform />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/ChargerPage" element={<ChargerPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;

