import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Textfield from '@Components/textfield';

const ResetPass = () => {
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
          <Textfield
            type="email"
            label="Email"
            placeholder="Email"
            id="email"
            onChange={(e) => handleFormChange(e)}
            errorMsg={formErrMsg.email}
          />

          <Textfield
            type={`${passwordVisible ? "text" : "password"}`}
            label="Password"
            placeholder="Password"
            id="password"
            onChange={(e) => handleFormChange(e)}
            errorMsg={formErrMsg.password}
            endIcon={passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          />

          <Textfield
            type={`${passwordVisible ? "text" : "password"}`}
            label="Confirm Password"
            placeholder="Password"
            id="confirm-password"
            onChange={(e) => handleFormChange(e)}
            errorMsg={formErrMsg.password}
            endIcon={passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          />
        <div className="reset-box">
          <button>Reset</button>
        </div>

        </div>
      </div>
    </div>
  )
}

export default ResetPass 
