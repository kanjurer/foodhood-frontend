import { useState } from 'react';
import { Button, Col, Row } from 'antd';
import SellFoodModal from './SellFoodModal';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ICartItem, IFoodItem } from '../Interfaces';
import ChefItem from './ChefItem';
import './Sell.css';
import CreateFoodModal from './CreateFoodModal';

export default function Sell({
  chefFoods,
  handleAddToCart,
  fetchData,
}: SellProps) {
  let [visible, handleSell, handleCancel] = useVisible();

  return (
    <>
      <div>
        <Button
          className="add-food-button"
          size="large"
          shape="circle"
          onClick={handleSell}
          icon={<AppstoreAddOutlined />}
        />
      </div>
      <CreateFoodModal
        visible={visible}
        handleCancel={handleCancel}
        fetchData={fetchData}
      />
      <Row>
        {chefFoods?.map((foodItem) => (
          <Col xs={20} sm={20} md={12} lg={8} xl={6} key={foodItem._id}>
            <ChefItem food={foodItem} fetchData={fetchData} />
          </Col>
        ))}
      </Row>
    </>
  );
}

interface SellProps {
  chefFoods: IFoodItem[];
  handleAddToCart: (cartItem: ICartItem) => void;
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
