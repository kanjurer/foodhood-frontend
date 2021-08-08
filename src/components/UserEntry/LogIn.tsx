import './LogIn.css';

import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { Input, SubmitButton, Form } from 'formik-antd';
import { Formik } from 'formik';

import { logInUser } from '../../fetchAPIs/fetchAPIs';
import { handleAlert } from '../../messageHandler/messageHandler';

export default function LogIn({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  const handleSubmit = (values: LogInState) => {
    logInUser(values)
      .then((res) => {
        logInFunction(true);
        handleAlert('success', res.data);
      })
      .catch((err) => {
        handleAlert('error', err.response.data);
      });
  };

  return (
    <div className="login-div">
      <Typography.Title>Log In</Typography.Title>
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

          <Button type="link">
            <Link to="/signup">Not a user? Sign up</Link>
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
