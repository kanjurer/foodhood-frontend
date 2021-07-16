import { Button, Statistic, Row, Col } from 'antd';
import { ICartItem } from '../Interfaces';

import './CartItem.css';

export default function CartItem(props: CartItemProps) {
  const { cartItem, handleRemoveFromCart } = props;
  return (
    <div className="cart-item">
      <Row>
        <Col span={4}>
          <Statistic prefix={'x'} value={cartItem.buyQuantity} />
        </Col>
        <Col span={14}>
          {cartItem.nameOfDish}
          <br />
          <a onClick={() => handleRemoveFromCart(cartItem)}>Remove</a>
        </Col>

        <Col span={6}>
          <Statistic
            prefix={'$'}
            value={cartItem.buyQuantity * cartItem.priceInCad}
          />
        </Col>
      </Row>
    </div>
  );
}

interface CartItemProps {
  cartItem: ICartItem;
  handleRemoveFromCart: (cartItem: ICartItem) => void;
}
