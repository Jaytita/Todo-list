import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RoundButton from '@components/circleButton';
import SlidingBox from '@components/slidingBox';
import Textfield from '@components/textfield';
import { setVisible } from '@redux/reducers/cardModalReducer';
import { setIsLogin } from '@redux/reducers/globalReducer';
import { RootState } from '@redux/store/reducers';
import { emailValidate } from '@src/utils';
import loadingLogin from '../loading-login.json';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalVisible = useSelector((state: RootState) => state.cardModal.visible);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [formErrMsg, setFormErrMsg] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleOpenCloseModal = () => {
    dispatch(setVisible(!modalVisible));
  }

  const handleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.id]: e.target.value,
    }));
  }

  const handleLogin = () => {
    setFormErrMsg((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: emailValidate(form.email),
      username: "",
      password: form.password ? "" : "Required",
    }));

    if (formErrMsg["email"] === "" && form.password) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  }

  const handleRegister = () => {
    setFormErrMsg((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: emailValidate(form.email),
      username: form.username ? "" : "Required",
      password: form.password ? "" : "Required",
    }));
  }

  const handleForgotPass = () => {
    emailValidate(form.email);
  }

  return(
    <div className="flex flex-col m-0 p-0 w-screen h-screen bg-slate-600">
      <div className="h-full">
        <Lottie
          animationData={loadingLogin}
          loop={true}
          style={{height: "90vh", width: "90%"}}
        />
      </div>

      <div className="absolute right-0 flex flex-col items-center gap-1 px-16 py-8 w-auto h-full bg-slate-800 bg-opacity-80 text-white overflow-x-auto backdrop-blur-md">
        <div className="flex flex-col items-center gap-4 mb-4 w-full">
          <p className="text-xl">
            Welcome to <b>Mai Lok</b>
          </p>
          <SlidingBox isSelected={isLoginMode} handleSelectChoice={() => setIsLoginMode(!isLoginMode)} />
        </div>

        <div className="flex flex-col w-full">
          <Textfield
            type="email"
            label="Email"
            placeholder="Email"
            id="email"
            onChange={(e) => handleFormChange(e)}
            errorMsg={formErrMsg.email}
          />
          <div className={`transition-all duration-700 overflow-hidden ${isLoginMode ? "max-h-0 scale-0" : "max-h-24 "}`}>
            <Textfield
              label="Username"
              placeholder="Username"
              id="username"
              maxLength={20}
              onChange={(e) => handleFormChange(e)}
              errorMsg={formErrMsg.username}
            />
          </div>
          <Textfield
            type={`${passwordVisible ? "text" : "password"}`}
            label="Password"
            placeholder="Password"
            id="password"
            maxLength={20}
            onChange={(e) => handleFormChange(e)}
            errorMsg={formErrMsg.password}
            endIcon={passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          />

          <div className={`flex flex-row justify-between items-center gap-8 mt-4 w-full transition-all duration-700 ${isLoginMode ? "" : "max-h-0 opacity-0"}`}>
            <div className="flex flex-row items-center gap-1">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <p className="hover:underline hover:cursor-pointer" onClick={() => navigate("/reset-pass")}>Forgot password?</p>
          </div>
        </div>

        <div className="w-full">
          <button className="w-full px-4 py-2 rounded-full bg-white text-black transition-all duration-200 cursor-pointer hover:bg-slate-100" onClick={isLoginMode ? handleLogin : handleRegister}>
            {isLoginMode ? "Login" : "Register"}
          </button>
        </div>

        <div className={`flex flex-col justify-center items-center gap-4 my-4 w-full max-h-36 transition-all duration-700 ${isLoginMode ? "" : "max-h-0 opacity-0 transition-all duration-700 scale-70"}`}>
          <p>or continue with</p>
          <div className="flex flex-row justify-center gap-4 w-full">
            <RoundButton image="/logo/facebook.png" alt="facebook"/>
            <RoundButton image="/logo/google.png" alt="google"/>
          </div>
        </div>
      </div>

      <Modal
        centered
        title={<span style={{color: "white"}}>Forgot password</span>}
        mask
        open={modalVisible}
        onOk={handleForgotPass}
        onCancel={handleOpenCloseModal}
        className="bg-slate-500"
      >
        <Textfield
          type="email"
          label="Email"
          placeholder={"Email"}
          id="email"
          onChange={(e) => handleFormChange(e)}
          errorMsg={formErrMsg.email}
          {...{ color: "white" }}
        />
      </Modal>
    </div>
  )
}

export default Login
