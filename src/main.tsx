import React from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './assets/css-global';

import Router from './routes';

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer />
    <Router />
  </React.StrictMode>,
);
