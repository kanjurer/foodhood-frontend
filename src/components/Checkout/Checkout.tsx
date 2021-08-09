import { Button, Empty, Table } from 'antd';

import { ICartItem } from '../../Interfaces';
import { getFoodItem } from '../../fetchAPIs/fetchAPIs';
import { calculateTotalOfCart } from '../Cart/Cart';
import { calculateCost } from '../../cartOperations/cartOperations';

export default function Checkout({
  cart,
  handleRemoveFromCart,
}: CheckoutProps) {
  const columns = [
    {
      title: 'Quantity',
      dataIndex: 'buyQuantity',
      key: 'buyQuantity',
    },
    {
      title: 'Name Of Dish',
      dataIndex: 'nameOfDish',
      key: 'nameOfDish',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: '',
      dataIndex: 'removeItem',
      key: 'removeItem',
    },
  ];
  const dataSource = cart.map((cartItem) => {
    return {
      buyQuantity: 'x ' + cartItem.buyQuantity,
      nameOfDish: cartItem.nameOfDish,
      totalCost: '$' + calculateCost(cartItem),
      removeItem: (
        <Button type="link" onClick={() => handleRemoveFromCart(cartItem)}>
          Remove
        </Button>
      ),
    };
  });
  return (
    <>
      <h1>Checkout</h1>

      <div>
        {cart.length !== 0 ? (
          <Table
            pagination={false}
            size="small"
            dataSource={dataSource}
            columns={columns}
            style={{ width: '45%' }}
            footer={() => <b>Total: {'$' + calculateTotalOfCart(cart)}</b>}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="I Am Hungry"
          />
        )}
      </div>
    </>
  );
}

interface CheckoutProps {
  cart: ICartItem[];
  handleRemoveFromCart: (cartItem: ICartItem) => void;
}

async function checkAvailability(cart: ICartItem[]) {
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
