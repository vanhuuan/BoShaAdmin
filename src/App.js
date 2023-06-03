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
import React, { useEffect } from "react";
import PageNotFound from './pages/NotFound';
import UserInfo from './pages/users/UserInfo';
import EditUser from './pages/users/EditUser';
import Admins from './pages/admins/Admins';
import DefaultLayout from './components/layout/DefaultLayout';
import Users from './pages/users/Users';
import UserDetailInfo from './pages/users/UserDetailInfo';
import Categories from './pages/categories/Categories';
import Books from './pages/books/Books';
import BookDetail from './pages/books/BookDetails';
import Chapter from './pages/chapter/Chapter';

function App() {
  useEffect(() => {
    document.title = 'BoShaAdmin';
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<DefaultLayout><Dashboard/></DefaultLayout>}></Route>
          <Route path="/logIn" element={<><Header /><Login /></>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePass" element={<ChangePassword />}></Route>
          <Route path="/user/userInfo" element={<DefaultLayout><UserInfo/></DefaultLayout>}></Route>
          <Route path="/user/userEdit" element={<DefaultLayout><EditUser/></DefaultLayout>}></Route>
          <Route path='/dashboard' element={<DefaultLayout><Dashboard/></DefaultLayout>}></Route>
          <Route path='/users' element={<DefaultLayout><Users/></DefaultLayout>}></Route>
          <Route path='/users/userDetailInfo' element={<DefaultLayout><UserDetailInfo/></DefaultLayout>}></Route>
          <Route path='/admins' element={<DefaultLayout><Admins/></DefaultLayout>}></Route>
          <Route path='/categories' element={<DefaultLayout><Categories/></DefaultLayout>}></Route>
          <Route path='/books' element={<DefaultLayout><Books/></DefaultLayout>}></Route>
          <Route path="/book/:id" element={<DefaultLayout><BookDetail /></DefaultLayout>}></Route>
          <Route path="/chapter/:id" element={<DefaultLayout><Chapter /></DefaultLayout>}></Route>
          <Route path='*' element={<><Header /><PageNotFound /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
