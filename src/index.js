import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/Search.js';
import { CartProvider } from './context/cart.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>

);