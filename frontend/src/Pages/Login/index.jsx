import { useState } from 'react';
import './login.scss'
import { Form, Input, Button, Divider } from 'antd'
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import Card from '../../components/card';

export default function Login() {
  const LoginButton = () => {

    return (
      <Button size="large" shape="round">
        Login With Google
      </Button>
    );
  };

  return(
    
    <div className="login-container">
      {/* <div>
        <Form
          className="card"
          name="login"
          layout="vertical"
        >
          <div className="img-container">
            <h1>MaiLok Dev</h1>
          </div>

          <div className="input-login-form">
            <div className="form-inline">
              <Form.Item
                key={"email"}
                rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                  {
                    type: "email",
                    message: "This is not a valid email!",
                  },
                ]}
                name={"email"}
                label={null}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
            </div>

            <div className="form-inline">
              <Form.Item
                key={"password"}
                rules={[{ required: true, message: "Password is required!" }]}
                name={"password"}
                label={null}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
            </div>
          </div>

          <div className="form-inline end-form">
            <Button
              size="large"
              htmlType="submit"
              type="primary"
            >
              <span>Login With Email</span>
            </Button>
          </div>

          <div className="form-inline end-line">
              <GoogleOAuthProvider
              >
                <LoginButton />
              </GoogleOAuthProvider>
            </div>

          <Divider />
          <div className="form-inline" style={{ marginTop: "0px" }}>
            <Button
              type="link"
            >
              Forgot password ?
            </Button>
          </div>
        </Form>
      </div> */}

      <Card />

    </div>
  )
}