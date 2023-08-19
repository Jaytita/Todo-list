import Backlog from '@pages/project/backlog';
import Board from '@pages/project/board';
import ResetPass from '@pages/resetPass';
import store from '@redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="/project" element={<Board isDarkMode={true} />} />
          <Route path="/project/backlog" element={<Backlog isDarkMode={true} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);