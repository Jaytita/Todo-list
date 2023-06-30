import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Task from './Pages/FEMTask';
import Login from './Pages/Login';

export default function App() {
	const [isLogin, setIsLogin] = useState(false);

	if (!isLogin) {
		return <Login />
	}
	return (
		<div className="App">

		</div>
	);
}

