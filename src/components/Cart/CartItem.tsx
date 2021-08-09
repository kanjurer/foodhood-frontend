import './CartItem.css';
import { Button, Row, Col, Typography } from 'antd';

import { ICartItem } from '../../Interfaces';
import { calculateCost } from '../../cartOperations/cartOperations';

export default function CartItem({
  cartItem,
  handleRemoveFromCart,
}: CartItemProps) {
  return (
    <div className="cart-item">
      <Row>
        <Col flex="50px">
          <b>x {cartItem.buyQuantity}</b>
        </Col>
        <Col flex="120px">
          <Typography.Title level={5} ellipsis={true}>
            {cartItem.nameOfDish}
          </Typography.Title>

          <Button type="link" onClick={() => handleRemoveFromCart(cartItem)}>
            Remove
          </Button>
        </Col>

        <Col flex="auto">
          <Typography>$ {calculateCost(cartItem)}</Typography>
        </Col>
      </Row>
    </div>
  );
}

interface CartItemProps {
  cartItem: ICartItem;
  handleRemoveFromCart: (cartItem: ICartItem) => void;
}
