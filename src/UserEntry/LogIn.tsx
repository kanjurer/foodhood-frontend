import './LogIn.css';

import { useState } from 'react';
import { Button, Typography, Alert } from 'antd';
import * as Yup from 'yup';
import { Input, SubmitButton, Form } from 'formik-antd';
import { Formik } from 'formik';
import { logInUser } from '../FetchAPIs/FetchAPIs';

export default function LogIn({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  let [error, setError] = useState<string | null>(null);
  console.log(error);
  const handleSubmit = (values: LogInState) => {
    logInUser(values)
      .then((res) => {
        logInFunction(true);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="login-div">
      <Typography.Title>Log In</Typography.Title>
      {error && (
        <Alert
          message={error}
          banner
          closable
          type="error"
          afterClose={() => setError(null)}
        />
      )}
      <br />

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
