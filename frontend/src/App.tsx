
import Login from '@pages/login';
import Board from '@pages/project/board';
import { RootState } from '@redux/store/reducers';
import { ConfigProvider, theme } from "antd";
import { useSelector } from 'react-redux';
import './App.scss';

const App: React.FC = () => {
	const { defaultAlgorithm, darkAlgorithm } = theme;
  const isLogin = useSelector((state: RootState) => state.globalState.isLogin);
	const isDarkMode = true;

	if (!isLogin) {
    return <Login />
	}
	return (
		<ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
			<Board isDarkMode={isDarkMode} />
		</ConfigProvider>
	)
}

export default App
