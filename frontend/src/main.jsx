import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.scss';
import App from './App';
import Task from './Pages/FEMTask';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<App/>}/>
					<Route exact path="/task" element={<Task/>}/>
				</Routes>
			</BrowserRouter>
	</React.StrictMode>
);