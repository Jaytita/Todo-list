import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './login.scss'
import { Form, Input, Button, Divider, Space } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import Card from '../../components/card';
import loadingLogin from '../../loading-login.json'

export default function Login() {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [delayBlack, setDelayBlack] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isFormValid, setFormIsValid] = useState({
    email: true,
    username: true,
    password: true,
  });

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

  const LoginButton = () => {

    return (
      <Button size="large" shape="round">
        Login With Google
      </Button>
    );
  };

  const handleLogin = () => {
    setFormIsValid((prevFormIsValid) => ({
      ...prevFormIsValid,
      username: !!form.username,
      password: !!form.password,
    }));

    if (form.username && form.password) {
      navigate("/task")
    }
  }

  const handleRegister = () => {
    let isValidEmail = true;
    if (form.email && /^\S+@\S+\.\S+$/.test(form.email)) {
      isValidEmail = "Wrong format";
    } else {
      isValidEmail = false;
    }

    setFormIsValid((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: isValidEmail,
      username: !!form.username,
      password: !!form.password,
    }));
  }

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
          <div className={`login-email ${isLoginMode ? "hidden" : ""}`}>
            <div className="login-input-label">
              <label htmlFor="email">Email</label>
              <span className={`${isFormValid.email ? "hidden" : ""}`}>
                {!form.email ? "Required" : isFormValid.email ? "" : "Wrong format"}
              </span>
            </div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => handleFormChange(e)}
            />
          </div>

          <div className="login-input-label">
            <label htmlFor="username">Username</label>
            <span className={`${isFormValid.username ? "hidden" : ""}`}>Required</span>
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            maxLength={20}
            onChange={(e) => handleFormChange(e)}
          />

          <div className="login-input-label">
            <label htmlFor="password">Password</label>
            <span className={`${isFormValid.password ? "hidden" : ""}`}>Required</span>
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
            <p>Forgot password?</p>
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
    </div>
  )
}