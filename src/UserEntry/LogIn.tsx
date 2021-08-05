import './LogIn.css';

import { Button, Typography } from 'antd';
import * as Yup from 'yup';
import { Input, SubmitButton, Form } from 'formik-antd';
import { Formik } from 'formik';

export default function LogIn({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  const handleSubmit = async (values: LogInState) => {
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
      logInFunction(true);
      console.log(data);
    } else {
      console.log(res.status);
    }
  };

  return (
    <div className="login-div">
      <Typography.Title>Log In</Typography.Title>

      <Formik
        validationSchema={LogInSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <Form.Item label="Username" name="username">
            <Input name="username" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password name="password" />
          </Form.Item>

          <SubmitButton disabled={false} type="primary">
            Submit
          </SubmitButton>

          <Button type="link" href="/signup">
            Not a user? Sign up
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

interface LogInState {
  username: string;
  password: string;
}

const LogInSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(14, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});
