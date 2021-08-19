import { useEffect, useState } from 'react';
import { Row, Col, Spin, Skeleton } from 'antd';

import { ICartItem, IFoodItem } from '../../Interfaces';
import FoodItem from '../FoodItem/FoodItem';
import { getFoods } from '../../fetchAPIs/fetchAPIs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { usePaginateData } from '../../paginateData/paginateData';

export default function Home({ handleAddToCart }: HomeProps) {
  let [foods, fetchData, hasMore] = usePaginateData<IFoodItem>(getFoods);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {foods.length === 0 && (
        <>
          <Skeleton /> <Skeleton />
          <Skeleton /> <Skeleton /> <Skeleton />
        </>
      )}
      <InfiniteScroll
        dataLength={foods.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Spin />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Row justify="center">
          {foods.map((foodItem: any) => (
            <Col flex="350px" key={foodItem._id}>
              <FoodItem food={foodItem} handleAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </>
  );
}

//implement checkNewFoods later

interface HomeProps {
  handleAddToCart: (cartItem: ICartItem) => void;
}
