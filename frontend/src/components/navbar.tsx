import { LogoutOutlined } from "@ant-design/icons";
import { setIsLogin } from '@redux/reducers/globalReducer';
import { RootState } from "@redux/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyButton from "./myButton";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.globalState.isLogin);

  const handleLogout = () => {
    dispatch(setIsLogin(false))
    navigate("/")
  }

  return (
    <div className="sticky flex justify-between items-center px-4 py-2 w-full">
      <a className="" href="/">Logo</a>
      <ul className="flex justify-between items-center md:gap-6 sm:gap-4">
        <li>
          <a className="md:px-4 sm:px-2 py-2 bg-zinc-700 rounded border-white text-white hover:brightness-90" href="/project">Projects</a>
        </li>
        <li>
          <a className="md:px-4 sm:px-2 py-2 bg-zinc-700 rounded border-white text-white hover:brightness-90" href="/project/backlog">Backlog</a>
        </li>
        <li>
          <MyButton text="Logout" onClick={handleLogout} startIcon={<LogoutOutlined />}/>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
