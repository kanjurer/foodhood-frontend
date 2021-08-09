import './Sell.css';

import { useState, useEffect, useContext } from 'react';
import { Button, Col, Row, Spin } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

import { UserContext } from '../../Context';
import { IFoodItem } from '../../Interfaces';
import ChefItem from './ChefItem';
import CreateFoodModal from './CreateFoodModal';
import BecomeAChef from './BecomeAChef';
import { getChefFoods } from '../../fetchAPIs/fetchAPIs';
import { handleAlert } from '../../messageHandler/messageHandler';
import InfiniteScroll from 'react-infinite-scroll-component';
import { usePaginateData } from '../../paginateData/paginateData';

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
  let [chefFoods, fetchChefData, hasMore] = usePaginateData<IFoodItem>(
    getChefFoods,
    () => logInFunction(false)
  );

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
        handleAlert={handleAlert}
        handleHide={handleHide}
        fetchChefData={fetchChefData}
      />
      <InfiniteScroll
        dataLength={chefFoods.length}
        next={fetchChefData}
        hasMore={hasMore}
        loader={<Spin />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Row justify="center">
          {chefFoods?.map((foodItem) => (
            <Col flex="350px" key={foodItem._id}>
              <ChefItem
                handleAlert={handleAlert}
                food={foodItem}
                fetchChefData={fetchChefData}
                key={foodItem._id}
              />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
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
