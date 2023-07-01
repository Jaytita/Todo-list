import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.scss';
import Task from './Pages/FEMTask';
import Login from './Pages/Login';
import CardModal from './Components/cardModal';

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
