import { LogoutOutlined } from "@ant-design/icons";
import { setIsLogin } from '@redux/reducers/globalReducer';
import { useDispatch } from "react-redux";
import MyButton from "./myButton";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLogin(false))
  }
  return (
    <div className="sticky flex justify-between items-center px-8 py-2 w-full">
      <a className="" href="/">Logo</a>
      <ul className="flex justify-between items-center gap-6">
        <li>
          <a className="px-4 py-2 bg-zinc-700 rounded border-white text-white hover:brightness-90" href="/project">Projects</a>
        </li>
        <li>
          <a className="px-4 py-2 bg-zinc-700 rounded border-white text-white hover:brightness-90" href="/project/backlog">Backlog</a>
        </li>
        <li>
          <MyButton text="Logout" onClick={handleLogout} startIcon={<LogoutOutlined />}/>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
