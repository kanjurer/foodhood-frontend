import './SignUp.css';

import { useState } from 'react';
import { Alert, Button, Typography } from 'antd';
import * as Yup from 'yup';
import { Input, SubmitButton, Form } from 'formik-antd';
import { Formik } from 'formik';
import { signUpUser } from '../FetchAPIs/FetchAPIs';

export default function SignUp({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  let [error, setError] = useState<string | null>(null);
  const handleSubmit = (values: SignUpState) => {
    signUpUser(values)
      .then((res) => {
        logInFunction(true);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="signup-div">
      <Typography.Title>SignUp</Typography.Title>

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
        validationSchema={SignUpSchema}
        initialValues={{
          username: '',
          password: '',
          nameOfUser: '',
          role: 'consumer' as 'consumer',
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <Form.Item label="Name" name="nameOfUser">
            <Input name="nameOfUser" />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input name="username" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password name="password" />
          </Form.Item>
          <SubmitButton type="primary">Submit</SubmitButton>
          <Button type="link" href="/login">
            Already a user? Log In
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

interface SignUpState {
  username: string;
  password: string;
  nameOfUser: string;
  role: 'consumer';
}

const SignUpSchema = Yup.object().shape({
  nameOfUser: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(14, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});
