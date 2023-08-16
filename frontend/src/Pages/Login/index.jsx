import './style.scss';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { Button, Divider, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';

import Card from '@Components/card';
import CardModal from '@Components/cardModal';
import loadingLogin from '../../loading-login.json';

import { useSelector, useDispatch } from 'react-redux';
import { setVisible } from '@redux/reducers/cardModalReducer';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPassRef = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [delayBlack, setDelayBlack] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [formErrMsg, setFormErrMsg] = useState({
    email: "",
    username: "",
    password: "",
  })
  const modalVisible = useSelector(state => state.cardModal.visible);

  useEffect(() => {
    setDelayBlack(false);
    setTimeout(() => {
      setDelayBlack(true);
    }, 300);
  }, [isLoginMode])

  const handleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleFormChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.id]: e.target.value,
    }));
  }

  const emailValidate = (mail) => {
    let emailErrMsg = "";
    if (!mail) {
      emailErrMsg = "Required";
    } else if (mail && !/^\S+@\S+\.\S+$/.test(mail)) {
      emailErrMsg = "Wrong format";
    }
    return emailErrMsg;
  }

  const LoginButton = () => {

    return (
      <Button size="large" shape="round">
        Login With Google
      </Button>
    );
  };

  const handleLogin = () => {
    setFormErrMsg((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: emailValidate(form.email),
      username: "",
      password: form.password ? "" : "Required",
    }));

    if (form.email && form.password) {
      navigate("/task")
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
    emailValidate();
  }

  const getPosition = (element) => {
    if (element.current) {
      const { top, left } = element.current.getBoundingClientRect();
      return [ Math.round(top), Math.round(left) ];
    }
  };

  return(
    <div className="login-container">
      <div className="login-left-side">
        <Lottie
          animationData={loadingLogin}
          loop={true}
          style={{height: "90vh", width: "90%"}}
        />
      </div>

      <div className="login-right-side">
        <div className="login-welcome">
          <p>Welcome to <b>Mai Lok</b></p>
          <div className="login-mode">
            <div className={`${isLoginMode ? "selected" : ""}`} onClick={() => setIsLoginMode(true)}>
              <p className={`${delayBlack && isLoginMode ? "delayed" : ""}`}>Login</p>
            </div>
            <div className={`${isLoginMode ? "" : "selected"}`} onClick={() => setIsLoginMode(false)}>
              <p className={`${delayBlack && !isLoginMode ? "delayed" : ""}`}>Register</p>
            </div>
            <div className={`mode-bg ${isLoginMode ? "" : "slide-right"}`}></div>
          </div>
        </div>

        <div className="login-input">
          <div className="login-input-label">
            <label htmlFor="email">Email</label>
            <span className={`input-label ${formErrMsg.email ? "" : "hidden"}`}>{formErrMsg.email}</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={(e) => handleFormChange(e)}
          />

          <div className={`login-username ${isLoginMode ? "hidden" : ""}`}>
            <div className="login-input-label">
              <label htmlFor="username">Username</label>
              <span className={`input-label ${formErrMsg.username ? "" : "hidden"}`}>{formErrMsg.username}</span>
            </div>
            <input
              type="text"
              placeholder="Username"
              id="username"
              maxLength={20}
              onChange={(e) => handleFormChange(e)}
            />
          </div>

          <div className="login-input-label">
            <label htmlFor="password">Password</label>
            <span className={`input-label ${formErrMsg.password ? "" : "hidden"}`}>{formErrMsg.password}</span>
          </div>
          <div className="password-container">
            <input
              type={`${passwordVisible ? "text" : "password"}`}
              placeholder="Password"
              id="password"
              maxLength={20}
              onChange={(e) => handleFormChange(e)}
            />
            {passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          </div>

          <div className={`login-remember ${isLoginMode ? "" : "hidden"}`}>
            <div className="login-checkbox">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <p ref={forgotPassRef} id="forgot-password" onClick={() => dispatch(setVisible(true))}>Forgot password?</p>
          </div>
        </div>

        <div className="login-box">
          <button onClick={isLoginMode ? handleLogin : handleRegister}>{isLoginMode ? "Login" : "Register"}</button>
        </div>

        <div className={`login-auth ${isLoginMode ? "" : "hidden"}`}>
          <p>or continue with</p>
          <div className="login-choices">
            <div className="login-choices-logo">
              <img src="/facebook.png" alt="facebook" id="facebook" />
            </div>
            <div className="login-choices-logo">
              <img src="/google.png" alt="google" id="google" />
            </div>
            <div className="login-choices-logo">
              <img src="/apple.png" alt="apple" id="apple" />
            </div>
            
          </div>
        </div>
      </div>

      <CardModal
        isVisible={modalVisible}
        title={"Forgot password"}
        emailValidate={emailValidate}
        onConfirm={handleForgotPass}
        position={getPosition(forgotPassRef)}
      />

      {/* <Modal
        open={forgotPass}
        title={"Forgot password"}
        closable={true}
        onCancel={() => setForgotPass(false)}
      /> */}
    </div>
  )
}