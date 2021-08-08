import { useState } from 'react';
import { Card } from 'antd';
import { IFoodItem } from '../../Interfaces';

import SellFoodModal from './SellFoodModal';
import ChefItemPreview from './ChefItemPreview';
import { HandleAlert } from '../../messageHandler/messageHandler';

export default function FoodItem({
  food,
  fetchChefData,
  handleAlert,
}: FoodItemProps) {
  let [sellFoodModalVisible, handleSellFoodModal, cancelSellFoodModal] =
    useVisible();
  let [chefItemPreviewVisible, handleChefItemPreview, cancelChefItemPreview] =
    useVisible();

  return (
    <>
      <Card
        onClick={handleChefItemPreview}
        style={{ margin: '10px' }}
        hoverable
        cover={
          <img style={{ borderRadius: '20px' }} alt="example" src="img.jpg" />
        }
        className="card-item"
      >
        <Card.Meta title={food.nameOfDish} description={food.madeByUser} />
      </Card>

      <SellFoodModal
        handleAlert={handleAlert}
        visible={sellFoodModalVisible}
        handleCancel={cancelSellFoodModal}
        fetchChefData={fetchChefData}
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
  fetchChefData: () => void;
  handleAlert: HandleAlert;
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