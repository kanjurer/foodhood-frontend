import { Button, Empty } from 'antd';
import { calculateTotalOfCart } from '../Cart/Cart';
import CartItem from '../Cart/CartItem';
import { ICartItem, IFoodItem } from '../Interfaces';

export default function Checkout({
  cart,
  handleRemoveFromCart,
}: CheckoutProps) {
  return (
    <>
      <h1>Checkout</h1>

      <div>
        {cart.length !== 0 ? (
          cart.map((cartItem) => (
            <CartItem
              cartItem={cartItem}
              handleRemoveFromCart={handleRemoveFromCart}
              key={cartItem._id}
            />
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="I Am Hungry"
          />
        )}
      </div>
      <div>Total: {calculateTotalOfCart(cart)}</div>
    </>
  );
}

interface CheckoutProps {
  cart: ICartItem[];
  handleRemoveFromCart: (cartItem: ICartItem) => void;
}

async function checkAvailability(cart: ICartItem[]) {
  let checkCart: ICartItem[];

  for (const cartItem of cart) {
    const response = await fetch(`/foods/${cartItem._id}`);
    if (response.ok) {
      const data: IFoodItem = await response.json();
      const buyQty = cart.find((item) => item._id === data._id)?.buyQuantity;

      if (buyQty === undefined) {
        return 'Item is unavailable now';
      }
      if (buyQty > data.quantity) {
        return 'Buy quantity is more than availability';
      }
    } else {
      return 'Item is unavailable now';
    }
  }
}
