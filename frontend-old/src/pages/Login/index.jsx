import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';

import loadingLogin from '../../loading-login.json';

import Textfield from '@Components/textfield';
import { setVisible } from '@redux/reducers/cardModalReducer';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgotPassRef = useRef();

  const modalVisible = useSelector((state) => state.cardModal.visible);

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

  useEffect(() => {
    setDelayBlack(false);
    setTimeout(() => {
      setDelayBlack(true);
    }, 300);
  }, [isLoginMode])

  const handleOpenCloseModal = () => {
    dispatch(setVisible(!modalVisible));
  };

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

  const handleLogin = () => {
    setFormErrMsg((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: emailValidate(form.email),
      username: "",
      password: form.password ? "" : "Required",
    }));

    if (emailValidate(form.email) === "" && form.password) {
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
          <Textfield
            type="email"
            label="Email"
            placeholder="Email"
            id="email"
            onChange={(e) => handleFormChange(e)}
            errorMsg={formErrMsg.email}
          />
          <div className={`login-username ${isLoginMode ? "hidden" : ""}`}>
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
          </div>
        </div>
      </div>

      {/* <CardModal
        title={"Forgot password"}
        emailValidate={emailValidate}
        onConfirm={handleForgotPass}
        position={getPosition(forgotPassRef)}
      /> */}
      <Modal
        centered
        title={<span style={{color: "white"}}>Forgot password</span>}
        mask
        open={modalVisible}
        onOk={handleForgotPass}
        onCancel={handleOpenCloseModal}
      >
        <Textfield
          type="email"
          label="Email"
          placeholder={"Email"}
          id="email"
          onChange={(e) => handleFormChange(e)}
          errorMsg={formErrMsg.email}
          style={{ color: "white" }}
        />
      </Modal>
    </div>
  )
}

export default Login
