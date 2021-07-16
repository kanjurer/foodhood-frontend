import { useState } from 'react';
import { Drawer, Button, Empty, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ICartItem } from '../Interfaces';
import CartItem from './CartItem';

export default function Cart(props: CartProps) {
  let { handleShowCart, visible, cart, handleRemoveFromCart } = props;

  return (
    <>
      <Drawer
        mask={false}
        maskClosable={true}
        title="Your Order"
        placement="right"
        closable={true}
        onClose={handleShowCart}
        visible={visible}
      >
        {cart.length !== 0 ? (
          [
            <Button
              className="cart-button"
              type="primary"
              shape="round"
              size="large"
              style={{ width: '200px' }}
              icon={<ShoppingCartOutlined />}
              onClick={props.handleShowCart}
            >
              Checkout $ {calculateTotalOfCart(cart)}
            </Button>,
            ...cart.map((cartItem) => (
              <CartItem
                cartItem={cartItem}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            )),
          ]
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="I am Hungry"
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

function calculateTotalOfCart(cart: ICartItem[]): number {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].buyQuantity * cart[i].priceInCad;
  }
  return sum;
}
