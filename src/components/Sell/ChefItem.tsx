import { useState } from 'react';
import { Card, Image } from 'antd';
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
          <Image
            alt="example"
            src={food.coverPhoto}
            style={{ width: '350px', height: '200px' }}
            preview={false}
            fallback="https://media.istockphoto.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?b=1&k=6&m=1218254547&s=170667a&w=0&h=EXwwoHJ3wI0H2jDfoFhqOiIo2c4cL0y7R8Gop3iIO30="
          />
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
