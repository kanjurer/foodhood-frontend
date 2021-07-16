import { useState } from 'react';
import { Card } from 'antd';
import { ICartItem, IFoodItem } from '../Interfaces';

import SellFoodModal from './SellFoodModal';
import ChefItemPreview from './ChefItemPreview';

export default function FoodItem({ food, handleAddToCart }: FoodItemProps) {
  let [chefItemPreviewVisible, handleChefItemPreview, cancelChefItemPreview] =
    useVisible();
  let [sellFoodModalVisible, handleSellFoodModal, cancelSellFoodModal] =
    useVisible();
  return (
    <>
      <Card
        onClick={handleChefItemPreview}
        className="food-item"
        hoverable
        cover={<img alt="example" src={`media/${food.coverPhoto}`} />}
      >
        <Card.Meta title={food.nameOfDish} description={food.madeByUser} />
      </Card>

      <SellFoodModal
        visible={sellFoodModalVisible}
        handleCancel={cancelSellFoodModal}
        dish={food}
      />
      <ChefItemPreview
        food={food}
        handleSellFoodModal={handleSellFoodModal}
        visible={chefItemPreviewVisible}
        handleCancel={cancelChefItemPreview}
      />
    </>
  );
}

interface FoodItemProps {
  food: IFoodItem;
  handleAddToCart: (cartItem: ICartItem) => void;
}
function useVisible(): [boolean, () => void, () => void] {
  let [visible, setVisible] = useState<boolean>(false);
  const handleClick = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return [visible, handleClick, handleCancel];
}
