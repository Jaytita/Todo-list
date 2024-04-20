import { useState } from 'react';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Textfield from '@components/textfield';
import { emailValidate } from '../utils';

const ResetPass: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [formErrMsg, setFormErrMsg] = useState({
    email: "",
    password: "",
    confirm_password: "",
  })

  const handleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.id]: e.target.value,
    }));
  };  

  const handleResetPass = () => {
    setFormErrMsg((prevFormIsValid) => ({
      ...prevFormIsValid,
      email: emailValidate(form.email),
      password: form.password ? "" : "Required",
      confirm_password: form.confirm_password ? "" : "Required",
    }));
  }

  return(
    <div className="flex flex-col justify-center items-center gap-4 px-12 py-8 w-screen h-screen bg-slate-500 backdrop-blur-md overflow-x-auto">
      <div className="flex flex-col items-center gap-4 p-8 md:w-1/2 bg-slate-800 border-2 border-solid border-white drop-shadow rounded-2xl">
        <div className="flex flex-col items-center w-full text-xl">
          <p>Reset password</p>
        </div>

        <div className="flex flex-col w-full">
          <Textfield
            type="email"
            label="Email"
            placeholder="Email"
            id="email"
            onChange={handleFormChange}
            errorMsg={formErrMsg.email}
          />

          <Textfield
            type={`${passwordVisible ? "text" : "password"}`}
            label="Password"
            placeholder="Password"
            id="password"
            onChange={handleFormChange}
            errorMsg={formErrMsg.password}
            endIcon={passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          />

          <Textfield
            type={`${passwordVisible ? "text" : "password"}`}
            label="Confirm Password"
            placeholder="Password"
            id="confirm_password"
            onChange={handleFormChange}
            errorMsg={formErrMsg.confirm_password}
            endIcon={passwordVisible ? <EyeInvisibleOutlined onClick={handleShowPassword}  /> : <EyeOutlined onClick={handleShowPassword} />}
          />
        </div>

        <div className="w-full">
          <button className="w-full px-4 py-2 rounded-full bg-white text-black transition-all duration-200 cursor-pointer hover:bg-slate-100" onClick={handleResetPass}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPass 
