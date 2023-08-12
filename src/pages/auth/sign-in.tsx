import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { postApiSignin } from '@/api';
import { setItem } from '@/utils/storage';
import { SignInPayload } from '@/types';

const SignIn: FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleSignIn = async (value: SignInPayload) => {
    try {
      const { token } = await postApiSignin(value);
      setItem('token', token);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl mb-4">登录</h1>
      <Form autoComplete="off" onFinish={handleSignIn}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
          <Button block type="text" className="mt-2" onClick={handleSignUp}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
