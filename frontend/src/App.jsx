import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Task from './Pages/FEMTask';
import Login from './Pages/Login';

export default function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Login/>}/>
					<Route exact path="/task" element={<Task/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

