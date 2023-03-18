import { Task } from '@mui/icons-material';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';

import Login from './Pages/Login';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
				<Route exact path="/" element={<Login/>}/>
				<Route exact path="/task" element={<Task/>}/>
				</Routes>
			</BrowserRouter>
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
				Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
				>
				Learn React
				</a>
			</header> */}
		</div>
	);
}

export default App;
