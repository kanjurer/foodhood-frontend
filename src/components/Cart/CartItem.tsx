import './CartItem.css';
import { Button, Row, Col, Typography } from 'antd';

import { ICartItem } from '../../Interfaces';

export default function CartItem({
  cartItem,
  handleRemoveFromCart,
}: CartItemProps) {
  return (
    <div className="cart-item">
      <Row>
        <Col span={4}> x {cartItem.buyQuantity}</Col>
        <Col span={10}>
          <Typography.Title level={5} ellipsis={true}>
            {cartItem.nameOfDish}
          </Typography.Title>

          <Button type="link" onClick={() => handleRemoveFromCart(cartItem)}>
            Remove
          </Button>
        </Col>

        <Col span={10}>
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

function calculateCost(cartItem: ICartItem): number {
  return Math.round(cartItem.buyQuantity * cartItem.priceInCad * 100) / 100;
}
