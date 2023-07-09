import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.scss';
import App from './App';
import ResetPass from './Pages/ResetPass';
import Task from './Pages/FEMTask';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <Provider store={store}> {/* Wrap the App component with Provider */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/reset-pass" element={<ResetPass />} />
          <Route exact path="/task" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);