import { ICartItem } from '../Interfaces';

export function handleRemoveFromCart(
  cart: ICartItem[],
  cartItem: ICartItem,
  callback: (newCartCopy: ICartItem[]) => void
): void {
  const cartCopy = cart.map((obj) => {
    return { ...obj };
  });

  let newCartCopy = cartCopy.filter((obj) => obj._id !== cartItem._id);

  callback(newCartCopy);
}

export function handleAddToCart(
  cart: ICartItem[],
  cartItem: ICartItem,
  callback: (newCartCopy: ICartItem[]) => void
) {
  let cartCopy = cart.map((obj) => {
    return { ...obj };
  });

  const foundItem = cart.find((el) => el._id === cartItem._id);
  if (foundItem === undefined) {
    callback([...cartCopy, cartItem]);
    return;
  }

  const index = cartCopy.findIndex((obj) => obj._id === cartItem._id);

  cartCopy[index] = {
    ...cartCopy[index],
    buyQuantity: cartCopy[index].buyQuantity + cartItem.buyQuantity,
  };

  callback(cartCopy);
}
