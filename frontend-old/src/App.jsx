import { useState } from 'react';
import store from '@redux/store';

import './App.scss';
import Task from '@Pages/FEMTask';
import Login from './Pages/Login';
import CardModal from '@Components/cardModal';

const App = () => {
	const [isLogin, setIsLogin] = useState(false);

	if (!isLogin) {
    return <Login />
	}
	return (
		<div className="App">

		</div>
	);
}

export default App
