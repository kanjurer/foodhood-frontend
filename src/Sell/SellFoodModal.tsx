import useForm from '../useForm';
import ImgCrop from 'antd-img-crop';

import { Modal, Button, Form, Input, Select } from 'antd';
import { IFoodItem } from '../Interfaces';

export default function SellFoodModal(props: SellFoodModalProps) {
  let [dish, handleChange] = useForm<IFoodItem>(props.dish);
  let { visible, handleCancel, fetchChefData } = props;

  const handlePut = () => {
    fetch(`http://localhost:3001/user/chefPosts/${dish._id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(dish),
    }).then((res) => {
      if (res.ok) {
        fetchChefData();
        handleCancel();
      } else {
        console.log(res.status);
      }
    });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/user/chefPosts/${dish._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(dish),
    }).then((res) => {
      if (res.ok) {
        fetchChefData();
        handleCancel();
      } else {
        console.log(res.status);
      }
    });
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
          <Button onClick={handleDelete} key="delete" shape="round" danger>
            Delete
          </Button>,
          <Button onClick={handlePut} key="submit" shape="round">
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
                onChange={handleChange}
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
  fetchChefData: () => void;
  dish: IFoodItem;
}
