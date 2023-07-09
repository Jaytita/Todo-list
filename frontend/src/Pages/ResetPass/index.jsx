import './style.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Divider, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export default function ResetPass() {
  const navigate = useNavigate();

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
  })

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

  const handleRegister = () => {
    setFormErrMsg((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: emailValidate(form.email),
      username: form.username ? "" : "Required",
      password: form.password ? "" : "Required",
    }));
  }


  return(
    <div className="reset-pass">
      <div className="reset-pass-container">
        <div className="reset-header">
          <p>Welcome to <b>Mai Lok</b></p>
        </div>

        <div className="reset-input">
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

          <div className="login-input-label">
            <label htmlFor="password">New Password</label>
            <span className={`input-label ${formErrMsg.password ? "" : "hidden"}`}>{formErrMsg.password}</span>
          </div>
          <div className="password-container">
            <input
              type={`${passwordVisible ? "text" : "password"}`}
              placeholder="Password"
              id="new-password"
              maxLength={20}
              onChange={(e) => handleFormChange(e)}
            />
            {passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          </div>

          <div className="login-input-label">
            <label htmlFor="password">Confirm Password</label>
            <span className={`input-label ${formErrMsg.password ? "" : "hidden"}`}>{formErrMsg.password}</span>
          </div>
          <div className="password-container">
            <input
              type={`${passwordVisible ? "text" : "password"}`}
              placeholder="Password"
              id="confirm-password"
              maxLength={20}
              onChange={(e) => handleFormChange(e)}
            />
            {passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          </div>

        <div className="reset-box">
          <button>Reset</button>
        </div>

        </div>
      </div>
    </div>
  )
}