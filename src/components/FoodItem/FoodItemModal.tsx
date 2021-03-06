import { useState } from 'react';

import {
  Modal,
  Button,
  Image,
  InputNumber,
  Typography,
  Tag,
  Space,
  Descriptions,
} from 'antd';
import {
  ShoppingCartOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { ICartItem, IFoodItem } from '../../Interfaces';
import './FoodItemModal.css';

export default function FoodItemModal({
  visible,
  handleCancel,
  food,
  handleAddToCart,
}: FoodItemModalProps) {
  let [quantity, setQuantity] = useState<number>(1);

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
    return Math.round(100 * priceInCad * quantity) / 100;
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
        style={{ borderRadius: '20px' }}
        destroyOnClose={true}
        visible={visible}
        title={
          <>
            <Space size={40}>
              <h2>{food.nameOfDish} </h2>
              <h1>{tags}</h1>
            </Space>
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
        <Image
          alt="example"
          src={food.coverPhoto}
          preview={false}
          fallback="https://media.istockphoto.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?b=1&k=6&m=1218254547&s=170667a&w=0&h=EXwwoHJ3wI0H2jDfoFhqOiIo2c4cL0y7R8Gop3iIO30="
        />

        <Descriptions bordered title="General Information" size="small">
          <Descriptions.Item
            label="Ingredients"
            labelStyle={{ fontWeight: 'bold' }}
            key="ingredients"
          >
            {food.ingredients}
          </Descriptions.Item>
          <Descriptions.Item
            label="Allergins"
            labelStyle={{ fontWeight: 'bold' }}
            key="allergins"
          >
            {food.allergins}
          </Descriptions.Item>
        </Descriptions>
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
    <Tag key="type" color={typeColor}>
      {food.type}
    </Tag>,
    <Tag key="cuisine" color="magenta">
      {food.cuisine}
    </Tag>,
  ];
}
