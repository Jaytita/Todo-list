import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Task from './Pages/Task';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		{/* <App /> */}
		<Task />
	</React.StrictMode>
);