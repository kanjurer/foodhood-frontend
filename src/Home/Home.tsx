import { Row, Col } from 'antd';

import { ICartItem, IFoodItem } from '../Interfaces';
import FoodItem from '../FoodItem/FoodItem';

export default function Home(props: HomeProps) {
  const { foods, handleAddToCart } = props;

  return (
    <>
      <Row>
        {foods?.map((foodItem) => (
          <Col xs={20} sm={20} md={12} lg={8} xl={6} key={foodItem._id}>
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
