import { useState } from 'react';

import { Modal, Button, InputNumber, Typography, Tag, Space } from 'antd';
import {
  ShoppingCartOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { ICartItem, IFoodItem } from '../Interfaces';
import './FoodItemModal.css';

export default function FoodItemModal(props: FoodItemModalProps) {
  let [quantity, setQuantity] = useState<number>(1);
  let { visible, handleCancel, food, handleAddToCart } = props;

  const handleChange = (value: number): void => {
    setQuantity(value);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };
  const handleIncrease = () => {
    if (quantity === food.quantity) return;
    setQuantity(quantity + 1);
  };
  const costCalculator = (priceInCad: number): number => {
    return priceInCad * quantity;
  };

  const onAddToCart = () => {
    handleAddToCart({ ...food, buyQuantity: quantity });
    setQuantity(1);
    handleCancel();
  };

  const tags = generateTags(food);

  return (
    <>
      <Modal
        destroyOnClose={true}
        visible={visible}
        title={
          <>
            <Space size={40}>
              <h2>{food.nameOfDish} </h2>
              <h1>{tags}</h1>
            </Space>{' '}
            <br />
            <Typography.Text type="secondary">
              By {food.madeByUser}
            </Typography.Text>
          </>
        }
        onCancel={handleCancel}
        footer={[
          <Button
            key="minus"
            onClick={handleDecrease}
            icon={<MinusCircleOutlined />}
          />,

          <InputNumber
            readOnly={true}
            bordered={false}
            value={quantity}
            size="large"
            onChange={handleChange}
            key="input"
            min={1}
            keyboard={true}
            defaultValue={1}
            style={{ width: '40px' }}
          />,
          <Button
            key="plus"
            onClick={handleIncrease}
            icon={<PlusCircleOutlined />}
          />,
          <Button
            key="addToCart"
            className="add-to-cart-button"
            shape="round"
            icon={<ShoppingCartOutlined />}
            onClick={onAddToCart}
          >
            Add to Cart - $ {costCalculator(food.priceInCad)}
          </Button>,
        ]}
      >
        <img style={{ width: '450px' }} src={`media/${food.coverPhoto}`} />
        <Typography.Title level={5}>Ingredients:</Typography.Title>
        {food.ingredients}
        <br />
        <br />

        <Typography.Title level={5}>Allergins:</Typography.Title>
        {food.allergins}
      </Modal>
    </>
  );
}

interface FoodItemModalProps {
  visible: boolean;
  handleCancel: () => void;
  food: IFoodItem;
  handleAddToCart: (cartItem: ICartItem) => void;
}

function generateTags(food: IFoodItem) {
  let typeColor: 'red' | 'green' | 'yellow';
  if (food.type === 'Vegetarian') {
    typeColor = 'yellow';
  } else if (food.type === 'Non-Vegetarian') {
    typeColor = 'red';
  } else {
    typeColor = 'green';
  }

  return [
    <Tag color={typeColor}>{food.type}</Tag>,
    <Tag color="magenta">{food.cuisine}</Tag>,
  ];
}
