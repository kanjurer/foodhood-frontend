import { useState } from 'react';
import { Card } from 'antd';
import { ICartItem, IFoodItem } from '../Interfaces';

import SellFoodModal from './SellFoodModal';
import ChefItemPreview from './ChefItemPreview';

export default function FoodItem({ food, fetchData }: FoodItemProps) {
  let [chefItemPreviewVisible, handleChefItemPreview, cancelChefItemPreview] =
    useVisible();
  let [sellFoodModalVisible, handleSellFoodModal, cancelSellFoodModal] =
    useVisible();
  return (
    <>
      <Card
        onClick={handleChefItemPreview}
        style={{ margin: '10px' }}
        hoverable
        cover={<img alt="example" src="img.jpg" />}
      >
        <Card.Meta title={food.nameOfDish} description={food.madeByUser} />
      </Card>

      <SellFoodModal
        visible={sellFoodModalVisible}
        handleCancel={cancelSellFoodModal}
        fetchData={fetchData}
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
  fetchData: () => void;
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
