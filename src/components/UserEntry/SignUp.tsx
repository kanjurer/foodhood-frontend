import './SignUp.css';

import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { Input, SubmitButton, Form } from 'formik-antd';
import { Formik } from 'formik';

import { signUpUser } from '../../fetchAPIs/fetchAPIs';
import { handleAlert } from '../../messageHandler/messageHandler';

export default function SignUp({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  const handleSubmit = (values: SignUpState) => {
    signUpUser(values)
      .then((res) => {
        logInFunction(true);
        handleAlert('success', res.data);
      })
      .catch((err) => {
        handleAlert('error', err.response.data);
      });
  };

  return (
    <div className="signup-div">
      <Typography.Title>SignUp</Typography.Title>

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
          <Button type="link">
            <Link to="/login">Already a user? Log In</Link>
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
