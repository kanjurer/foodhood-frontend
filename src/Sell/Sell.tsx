import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { IFoodItem } from '../Interfaces';
import ChefItem from './ChefItem';
import './Sell.css';
import CreateFoodModal from './CreateFoodModal';
import { useContext } from 'react';
import { UserContext } from '../Context';

export default function Sell({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  const user = useContext(UserContext);
  if (user?.role === 'chef') {
    return <SellApp logInFunction={logInFunction} />;
  }
  return <BecomeASeller />;
}

export function SellApp({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  let [visible, handleSell, handleCancel] = useVisible();
  let [chefFoods, setChefFoods] = useState<IFoodItem[]>([]);

  async function fetchChefData() {
    try {
      const response = await fetch(`/user/chefPosts`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setChefFoods(data);
      } else {
        logInFunction(false);
        console.log(await response.text());
      }
    } catch (err) {
      console.log('oops');
    }
  }
  useEffect(() => {
    fetchChefData();
  }, []);

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
        fetchChefData={fetchChefData}
      />
      <Row justify="center">
        {chefFoods?.map((foodItem) => (
          <Col flex="350px" key={foodItem._id}>
            <ChefItem
              food={foodItem}
              fetchChefData={fetchChefData}
              key={foodItem._id}
            />
          </Col>
        ))}
      </Row>
    </>
  );
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

function BecomeASeller() {
  return <h1>become a seller today!</h1>;
}
