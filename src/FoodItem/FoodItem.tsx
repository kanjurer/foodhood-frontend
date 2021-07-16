import { useState } from 'react';
import { Card } from 'antd';
import { ICartItem, IFoodItem } from '../Interfaces';

import FoodItemModal from './FoodItemModal';
import './FoodItem.css';

export default function FoodItem({ food, handleAddToCart }: FoodItemProps) {
  console.log(food.coverPhoto);
  let [visible, setVisible] = useState<boolean>(false);
  const handleClick = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Card
        onClick={handleClick}
        className="food-item"
        hoverable
        cover={<img alt="example" src={`media/${food.coverPhoto}`} />}
      >
        <Card.Meta title={food.nameOfDish} description={food.madeByUser} />
      </Card>

      <FoodItemModal
        visible={visible}
        handleCancel={handleCancel}
        food={food}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
}

interface FoodItemProps {
  food: IFoodItem;
  handleAddToCart: (cartItem: ICartItem) => void;
}
