import { Form, Input, Button, Checkbox, Typography } from 'antd';

import useForm from '../useForm';

export default function SignUp() {
  let [values, handleChange] = useForm<SignUpState>({
    username: '',
    password: '',
    role: 'consumer',
    nameOfUser: '',
  });

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3001/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log(await res.text());
    }
  };

  return (
    <div>
      <Typography.Title>SignUp</Typography.Title>
      <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Name"
          name="nameOfUser"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            name="nameOfUser"
            onChange={handleChange}
            value={values.nameOfUser}
          />
        </Form.Item>
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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
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

interface SignUpState {
  username: string;
  password: string;
  nameOfUser: string;
  role: 'consumer' | 'chef';
}
