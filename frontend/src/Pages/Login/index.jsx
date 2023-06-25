import { useState, useEffect } from 'react';
import './login.scss'
import { Form, Input, Button, Divider, Space } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import Card from '../../components/card';

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [delayBlack, setDelayBlack] = useState(false);

  useEffect(() => {
    setDelayBlack(false);
    setTimeout(() => {
      setDelayBlack(true);
    }, 500);
  }, [isLoginMode])

  const handleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const LoginButton = () => {

    return (
      <Button size="large" shape="round">
        Login With Google
      </Button>
    );
  };

  return(
    <div className="login-container">
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
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" name="email" />
          </div>

          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" name="username" />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input type={`${passwordVisible ? "text" : "password"}`} placeholder="Password" name="password" />
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
          <button>{isLoginMode ? "Login" : "Register"}</button>
        </div>

        <div className={`login-auth ${isLoginMode ? "" : "hidden"}`}>
          <p>or continue with</p>
          <div className="login-choices">
            <img src="/facebook.png" alt="" />
            <img src="/google.png" alt="" />
            <img src="/apple.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}