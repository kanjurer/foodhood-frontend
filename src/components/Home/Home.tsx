import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import { ICartItem, IFoodItem } from '../../Interfaces';
import FoodItem from '../FoodItem/FoodItem';
import { getFoods } from '../../fetchAPIs/fetchAPIs';

export default function Home(props: HomeProps) {
  let [foods, setFoods] = useState<IFoodItem[]>([]);

  async function fetchData() {
    getFoods()
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const { handleAddToCart } = props;

  return (
    <>
      <Row justify="center">
        {foods?.map((foodItem) => (
          <Col flex="350px" key={foodItem._id}>
            <FoodItem food={foodItem} handleAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </>
  );
}

//implement checkNewFoods later

interface HomeProps {
  handleAddToCart: (cartItem: ICartItem) => void;
}
