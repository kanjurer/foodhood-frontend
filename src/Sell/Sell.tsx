import { useState } from 'react';
import { Button, Col, Row } from 'antd';
import SellFoodModal from './SellFoodModal';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ICartItem, IFoodItem } from '../Interfaces';
import ChefItem from './ChefItem';
import './Sell.css';

export default function Sell({ chefFoods, handleAddToCart }: SellProps) {
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
      <SellFoodModal visible={visible} handleCancel={handleCancel} />
      <Row>
        {chefFoods?.map((foodItem) => (
          <Col xs={20} sm={20} md={12} lg={8} xl={6} key={foodItem._id}>
            <ChefItem food={foodItem} handleAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </>
  );
}

interface SellProps {
  chefFoods: IFoodItem[];
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
