import './Settings.css';

import * as Yup from 'yup';
import { Dispatch, SetStateAction, useContext } from 'react';

import { UserContext } from '../Context';
import { Typography, Collapse } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { IUser } from '../Interfaces';
import { userSetter } from '../App';
import { changeNameOfUser, changePasswordOfUser } from '../FetchAPIs/FetchAPIs';

export default function Settings({
  setSignedInUser,
}: {
  setSignedInUser: Dispatch<SetStateAction<IUser | null>>;
}) {
  const user = useContext(UserContext);

  if (user === null) return <h1>Mot allowed</h1>;

  const handleNameOfUserPut = async (editedUserInfo: IEditedNameOfUser) => {
    changeNameOfUser(editedUserInfo)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setSignedInUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handlePasswordPut = async (editedUserInfo: IEditedPassword) => {
    changePasswordOfUser(editedUserInfo)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setSignedInUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <div className="settings-div">
        <Typography.Title level={1}>Settings</Typography.Title>

        <Collapse>
          <Collapse.Panel header="Edit your name" key="edit your name">
            <Formik
              validationSchema={EditNameOfUserSchema}
              initialValues={{
                nameOfUser: user.nameOfUser,
              }}
              onSubmit={(values, { setSubmitting }) => {
                handleNameOfUserPut(values);
                setSubmitting(false);
              }}
            >
              <Form layout="vertical">
                <Form.Item name="nameOfUser" label="Name" tooltip="Your name">
                  <Input name="nameOfUser" placeholder="John Wick" />
                </Form.Item>
                <SubmitButton>Submit</SubmitButton>
              </Form>
            </Formik>
          </Collapse.Panel>
          <Collapse.Panel header="Edit your password" key="edit your password">
            <Formik
              validationSchema={EditPasswordSchema}
              initialValues={{
                oldPassword: '',
                newPassword: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                handlePasswordPut(values);
                setSubmitting(false);
              }}
            >
              <Form layout="vertical">
                <Form.Item name="oldPassword" label="Old Password">
                  <Input name="oldPassword" type="password" />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  tooltip="Choose a strong password"
                >
                  <Input name="newPassword" type="password" />
                </Form.Item>
                <SubmitButton>Submit</SubmitButton>
              </Form>
            </Formik>
          </Collapse.Panel>
        </Collapse>
      </div>
    </>
  );
}

const EditNameOfUserSchema = Yup.object().shape({
  nameOfUser: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

const EditPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  newPassword: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

interface IEditedNameOfUser {
  nameOfUser: string;
}

interface IEditedPassword {
  oldPassword: string;
  newPassword: string;
}
