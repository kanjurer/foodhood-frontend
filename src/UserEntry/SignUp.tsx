import './SignUp.css';

import { Button, Typography } from 'antd';
import * as Yup from 'yup';
import { Input, SubmitButton, Form } from 'formik-antd';
import { Formik } from 'formik';

export default function SignUp({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  const handleSubmit = async (values: SignUpState) => {
    const res = await fetch(`/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      const data = await res.text();
      console.log(data);
      logInFunction(true);
    } else {
      console.log(await res.text());
    }
  };

  return (
    <div className="signup-div">
      <Typography.Title>SignUp</Typography.Title>

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
