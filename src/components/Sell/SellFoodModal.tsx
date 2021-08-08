import * as Yup from 'yup';
import { Button, Modal, Space, Upload } from 'antd';
import { Formik } from 'formik';
import { SubmitButton, Form, Input, Select, InputNumber } from 'formik-antd';

import { IDish, IFoodItem } from '../../Interfaces';
import { deleteChefFood, updateChefFood } from '../../fetchAPIs/fetchAPIs';
import { HandleAlert } from '../../messageHandler/messageHandler';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

export default function SellFoodModal({
  visible,
  handleCancel,
  fetchChefData,
  dish,
  handleAlert,
}: SellFoodModalProps) {
  let [fileList, setFileList] = useState<any>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: dish.coverPhoto,
    },
  ]);

  const handlePut = (food: IDish) => {
    updateChefFood(dish._id, food)
      .then((res) => {
        handleAlert('success', res.data);
        fetchChefData();
        handleCancel();
      })
      .catch((err) => {
        handleAlert('error', err.response.data);
      });
  };

  const handleDelete = () => {
    deleteChefFood(dish._id)
      .then((res) => {
        handleAlert('success', res.data);
        fetchChefData();
        handleCancel();
      })
      .catch((err) => {
        handleAlert('error', err.response.data);
      });
  };

  return (
    <>
      <Formik
        validationSchema={FoodSchema}
        initialValues={dish}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handlePut({ ...values, coverPhoto: fileList[0] });
          setSubmitting(false);
        }}
      >
        <Modal
          footer={null}
          destroyOnClose={true}
          visible={visible}
          title="Post a Food"
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item
              name="nameOfDish"
              label="Name Of Food"
              tooltip="Choose a nice name"
              required
            >
              <Input name="nameOfDish" placeholder="Tandoori Chicken" />
            </Form.Item>
            <Form.Item
              name="cuisine"
              label="Cuisine"
              tooltip={'Tooltip with customize icon'}
              required
            >
              <Input placeholder="Indian" name="cuisine" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type of Food"
              tooltip={'It helps user pick the right food!'}
              required
            >
              <Select name="type">
                <Select.Option value="Vegetarian">Vegetarian</Select.Option>
                <Select.Option value="Non-Vegetarian">
                  Non-Vegetarian
                </Select.Option>
                <Select.Option value="Vegan">Vegan</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="ingredients"
              label="Ingredients"
              tooltip={'It gives users a brief idea about the dish'}
            >
              <Input
                type="textarea"
                name="ingredients"
                placeholder="Chicken, Spices, Garlic, Peanuts"
              />
            </Form.Item>
            <Form.Item
              name="allergins"
              label="Allergins"
              tooltip={'Helps users choose the right dish'}
            >
              <Input type="textarea" placeholder="Peanuts" name="allergins" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Stock Quantity"
              tooltip={'Pick the stock number'}
            >
              <InputNumber
                type="number"
                placeholder="10"
                name="quantity"
                min={1}
              />
            </Form.Item>
            <Form.Item
              name="priceInCad"
              label="Set Price (CAD$) / meal"
              tooltip={'Pick the right price for your dish'}
            >
              <InputNumber
                placeholder="4.95"
                name="priceInCad"
                min={0.99}
                max={49.99}
              />
            </Form.Item>
            <Form.Item
              name="coverPhoto"
              label="Cover Photo"
              tooltip={'Upload cover photo of your food'}
            >
              <ImgCrop rotate>
                <Upload
                  listType="picture-card"
                  name="coverPhoto"
                  fileList={fileList}
                  showUploadList={true}
                  onRemove={() => {
                    setFileList([]);
                  }}
                  beforeUpload={(file) => {
                    setFileList([file]);
                    return false;
                  }}
                >
                  {fileList.length === 0 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Space>
              <SubmitButton name="submit">Submit</SubmitButton>
              <Button name="delete" onClick={handleDelete}>
                Delete
              </Button>
            </Space>
          </Form>
        </Modal>
      </Formik>
    </>
  );
}

interface SellFoodModalProps {
  visible: boolean;
  handleCancel: () => void;
  fetchChefData: () => void;
  dish: IFoodItem;
  handleAlert: HandleAlert;
}

const FoodSchema = Yup.object().shape({
  cuisine: Yup.string().required('Required'),
  nameOfDish: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  ingredients: Yup.string(),
  allergins: Yup.string(),
  priceInCad: Yup.number()
    .min(0.99, 'Minimum price should be 0.99$')
    .max(49.99, 'Maximum price is 49.99'),
  quantity: Yup.number().min(1, 'Minimum quantity is 1!'),
  type: Yup.string().oneOf(['Vegetarian', 'Non-Vegetarian', 'Vegan']),
});
