import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/layout/header/Header';
import Login from './pages/authen/Login';
import ForgotPassword from './pages/authen/CheckEmail';
import ChangePassword from './pages/authen/ChangePassword';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import PageNotFound from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<><Header /><Dashboard /></>}></Route>
          <Route path="/logIn" element={<><Header /><Login /></>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePass" element={<ChangePassword />}></Route>
          <Route path='*' element={<><Header /><PageNotFound /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
