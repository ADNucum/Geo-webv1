import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Signin from './components/SignIn';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<LoginLayout />} />
        {/* Route for the login page */}
        <Route path="/signin" element={<SignIn/>} />
        {/* Route for the dashboard page */}
        <Route path="/dashboard" element={<DashboardLayout />} />
        {/* Route for other pages */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

// Main layout with NavBar
const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </div>
    </>
  );
};

// Layout for the login page
const LoginLayout = ({ children }) => {
  return (
    <div className="container mt-4">
      <Login/>
      { children }
    </div>
  );
};

// Layout for the login page
const SignIn = ({ children }) => {
  return (
    <div className="container mt-4">
      <Signin/>
      { children }
    </div>
  );
};

// Layout for the Dashboard page
const DashboardLayout = () => {
  return (
    <>
      <Dashboard />
      <div className="container mt-4">
        {/* Additional content goes here */}
      </div>
    </>
  );
};

export default App;
