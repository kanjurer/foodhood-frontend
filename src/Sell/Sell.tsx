import './Sell.css';

import { useState, useEffect, useContext } from 'react';
import { Button, Col, Row } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

import { UserContext } from '../Context';
import { IFoodItem } from '../Interfaces';
import ChefItem from './ChefItem';
import CreateFoodModal from './CreateFoodModal';
import BecomeAChef from './BecomeAChef';
import { getChefFoods } from '../FetchAPIs/FetchAPIs';

export default function Sell({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  const user = useContext(UserContext);
  if (user?.role === 'chef') {
    return <SellApp logInFunction={logInFunction} />;
  }
  return <BecomeAChef />;
}

export function SellApp({
  logInFunction,
}: {
  logInFunction: (login: boolean) => void;
}) {
  let [visible, handleShowSell, handleHide] = useVisible();
  let [chefFoods, setChefFoods] = useState<IFoodItem[]>([]);

  async function fetchChefData() {
    getChefFoods()
      .then((res) => {
        console.log(res);
        setChefFoods(res.data);
      })
      .catch((err) => {
        logInFunction(false);
        console.log(err.response.data);
      });
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
          onClick={handleShowSell}
          icon={<AppstoreAddOutlined />}
        />
      </div>
      <CreateFoodModal
        visible={visible}
        handleHide={handleHide}
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
  const handleShow = (): void => {
    setVisible(true);
  };
  const handleHide = (): void => {
    setVisible(false);
  };

  return [visible, handleShow, handleHide];
}
