import { Drawer, Button, Empty } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { ICartItem } from '../../Interfaces';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Cart({
  handleShowCart,
  visible,
  cart,
  handleRemoveFromCart,
}: CartProps) {
  return (
    <>
      <Drawer
        mask={true}
        title="Your Order"
        placement="right"
        closable={true}
        onClose={handleShowCart}
        visible={visible}
      >
        {cart.length !== 0 ? (
          [
            <Link to="/checkout" key="button">
              <Button
                key="button"
                className="cart-button"
                type="primary"
                shape="round"
                size="large"
                style={{ width: '200px' }}
                icon={<ShoppingCartOutlined />}
                onClick={handleShowCart}
              >
                Checkout $ {calculateTotalOfCart(cart)}
              </Button>
            </Link>,
            ...cart.map((cartItem) => (
              <CartItem
                cartItem={cartItem}
                handleRemoveFromCart={handleRemoveFromCart}
                key={cartItem._id}
              />
            )),
          ]
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="I Am Hungry"
          />
        )}
      </Drawer>
    </>
  );
}

interface CartProps {
  handleShowCart: () => void;
  handleRemoveFromCart: (cartItem: ICartItem) => void;
  visible: boolean;
  cart: ICartItem[];
}

export function calculateTotalOfCart(cart: ICartItem[]): number {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].buyQuantity * cart[i].priceInCad;
  }
  return Math.round(sum * 100) / 100;
}
