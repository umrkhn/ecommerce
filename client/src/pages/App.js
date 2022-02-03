import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { refreshToken } from '../actions/user';
import ProductList from './products/ProductList';
import ProductDetails from './products/ProductDetails';
import Cart from './cart';
import Register from './auth/Register';
import Login from './auth/Login';
import NotFound from './NotFound';
import Layout from '.././components/layouts/Layout';
import './App.css';

const App = () => {
  const { isSignedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSignedIn) return;
    dispatch(refreshToken());
  }, [dispatch, isSignedIn]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
