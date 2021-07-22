import { useState } from 'react';
import { Card } from 'antd';
import { ICartItem, IFoodItem } from '../Interfaces';

import FoodItemModal from './FoodItemModal';

export default function FoodItem({ food, handleAddToCart }: FoodItemProps) {
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
        style={{ margin: '10px' }}
        hoverable
        cover={<img alt="example" src="img.jpg" />}
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
