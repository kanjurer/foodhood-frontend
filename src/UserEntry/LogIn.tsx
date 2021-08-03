import { Form, Input, Button, Typography } from 'antd';

import useForm from '../useForm';

export default function LogIn() {
  let [values, handleChange] = useForm<LogInState>({
    username: '',
    password: '',
  });

  const handleUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/user', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        return;
      }
      localStorage.removeItem('user');
      throw await response.text();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3001/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      const data = await res.json();
      handleUser();
      console.log(data);
    } else {
      console.log(res.status);
    }
  };

  return (
    <div>
      <Typography.Title>LogIn</Typography.Title>
      <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            name="username"
            onChange={handleChange}
            value={values.username}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

interface LogInState {
  username: string;
  password: string;
}
