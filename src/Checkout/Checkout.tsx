import { Button, Empty } from 'antd';
import { calculateTotalOfCart } from '../Cart/Cart';
import CartItem from '../Cart/CartItem';
import { getFoodItem } from '../FetchAPIs/FetchAPIs';
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
    getFoodItem(cartItem._id)
      .then((res) => {
        const buyQty = cart.find(
          (item) => item._id === res.data._id
        )?.buyQuantity;

        if (buyQty === undefined) {
          return 'Item is unavailable now';
        }
        if (buyQty > res.data.quantity) {
          return 'Buy quantity is more than availability';
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
}
