import { useState } from 'react';
import useForm from '../useForm';
import ImgCrop from 'antd-img-crop';

import {
  Modal,
  Button,
  InputNumber,
  Typography,
  Tag,
  Space,
  Form,
  Input,
  Select,
  Upload,
} from 'antd';
import {
  ShoppingCartOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { ICartItem, IFoodItem } from '../Interfaces';

export default function SellFoodModal(props: SellFoodModalProps) {
  let [dish, handleChange] = useForm<IDish>(
    props.dish || {
      madeByUser: 'kanjurer',
      cuisine: '',
      type: 'Vegetarian',
      nameOfDish: '',
      ingredients: '',
      allergins: '',
      priceInCad: 0,
      quantity: 0,
    }
  );
  let { visible, handleCancel } = props;
  let [coverPhoto, setCoverPhoto] = useState<any>();

  const imageHandler = (e: any) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
  };

  const handlePost = () => {
    let formData = new FormData();
    Object.keys(dish).forEach((key) =>
      formData.append(key, (dish as any)[key])
    );
    formData.append('file', coverPhoto);
    fetch(`http://localhost:3001/foodItems/${dish.madeByUser}/postItem`, {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data',
      },
      body: formData,
    }).then((d) => console.log(d));
    handleCancel();
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        visible={visible}
        title="Post a Food"
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} key="cancel" shape="round">
            Cancel
          </Button>,
          <Button onClick={handlePost} key="submit" shape="round">
            Post
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name Of Food" tooltip="Choose a nice name" required>
            <Input
              onChange={handleChange}
              name="nameOfDish"
              value={dish.nameOfDish}
              placeholder="Tandoori Chicken"
            />
          </Form.Item>
          <Form.Item label="Cuisine" tooltip={'Tooltip with customize icon'}>
            <Input
              placeholder="Indian"
              name="cuisine"
              value={dish.cuisine}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Type of Food"
            tooltip={'It helps user pick the right food!'}
            required
          >
            <Select onSelect={handleChange} value={dish.type}>
              <Select.Option value="Vegetarian">Vegetarian</Select.Option>
              <Select.Option value="Non-Vegetarian">
                Non-Vegetarian
              </Select.Option>
              <Select.Option value="Vegan">Vegan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Ingredients"
            tooltip={'It gives users a brief idea about the dish'}
          >
            <Input
              type="textarea"
              name="ingredients"
              onChange={handleChange}
              value={dish.ingredients}
              placeholder="Chicken, Spices, Garlic, Peanuts"
            />
          </Form.Item>
          <Form.Item
            label="Allergins"
            tooltip={'Helps users choose the right dish'}
          >
            <Input
              type="textarea"
              placeholder="Peanuts"
              name="allergins"
              onChange={handleChange}
              value={dish.allergins}
            />
          </Form.Item>
          <Form.Item label="Stock Quantity" tooltip={'Pick the stock number'}>
            <Input
              type="number"
              placeholder="10"
              name="quantity"
              onChange={handleChange}
              value={dish.quantity}
            />
          </Form.Item>
          <Form.Item
            label="Set Price (CAD$) / meal"
            tooltip={'Pick the right price for your dish'}
          >
            <Input
              type="number"
              placeholder="4.95"
              name="priceInCad"
              onChange={handleChange}
              value={dish.priceInCad}
            />
          </Form.Item>
          <Form.Item
            label="Upload Cover Photo"
            tooltip={'Pick the right photo for your dish'}
          >
            <ImgCrop rotate>
              <input
                type="file"
                name="file"
                multiple={false}
                onChange={imageHandler}
              />{' '}
            </ImgCrop>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

interface SellFoodModalProps {
  visible: boolean;
  handleCancel: () => void;
  dish?: IDish;
}

interface IDish {
  madeByUser: string;
  cuisine: string;
  type: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  nameOfDish: string;
  ingredients: string;
  allergins: string;
  priceInCad: number;
  quantity: number;
}
