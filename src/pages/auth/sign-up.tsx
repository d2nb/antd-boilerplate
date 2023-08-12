import { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

const SignUp: FC = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">注册</h1>
      <Form autoComplete="off">
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="邮箱" />
        </Form.Item>

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
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
