import { Row, Col } from 'antd';

import { ICartItem, IFoodItem } from '../Interfaces';
import FoodItem from '../FoodItem/FoodItem';

export default function Home(props: HomeProps) {
  const { foods, handleAddToCart } = props;

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
  foods: IFoodItem[];
  handleAddToCart: (cartItem: ICartItem) => void;
}
