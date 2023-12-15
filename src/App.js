import React from 'react';
import HomePage from './pages/HomePage.js';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound.js';
import Contact from './pages/Contact.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import About from './pages/About.js';
import Register from './pages/Auth/Register.js';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import AdminRoute from './components/Routes/AdminRoute.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import Users from './pages/Admin/Users.js';
import Profile from './pages/user/Profile.js';
import Orders from './pages/user/Orders.js';
import Products from './pages/Admin/Products.jsx';
import UpdateProduct from './pages/Admin/UpdateProduct.jsx';

function App() {

  return (

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<PrivateRoute />} >

        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile' element={<Profile/>}/>
        <Route path='user/orders' element={<Orders/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute />} >
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/product/:slug' element={<UpdateProduct />} />
        <Route path='admin/product' element={<Products />} />
        <Route path='admin/users' element={<Users />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/Privacy-Policy' element={<PrivacyPolicy />} />
      <Route path='/category' element={<PageNotFound />} />
      <Route path='/cart' element={<PageNotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>


  );
}

export default App;
