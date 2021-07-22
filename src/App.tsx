import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { ICartItem, IFoodItem } from './Interfaces';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Sell from './Sell/Sell';
import Cart from './Cart/Cart';

export default function App() {
  let [foods, setFoods] = useState<IFoodItem[]>([]);
  let [cart, setCart] = useState<ICartItem[]>([]);
  let [showCart, setShowCart] = useState<boolean>(false);

  async function fetchData() {
    const response = await fetch('http://localhost:3001/foodItems', {
      method: 'GET',
    });
    const data = await response.json();
    setFoods(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveFromCart = (cartItem: ICartItem): void => {
    const cartCopy = cart.map((obj) => {
      return { ...obj };
    });

    let newCartCopy = cartCopy.filter((obj) => obj._id !== cartItem._id);
    setCart(newCartCopy);
  };

  const handleShowCart = (): void => {
    setShowCart(!showCart);
  };

  const handleAddToCart = (cartItem: ICartItem): void => {
    const foundItem = cart.find((el) => el._id === cartItem._id);
    if (foundItem === undefined) {
      setCart([...cart, cartItem]);
      return;
    }

    let cartCopy = cart.map((obj) => {
      return { ...obj };
    });

    const index = cartCopy.findIndex((obj) => obj._id === cartItem._id);
    cartCopy[index] = {
      ...cartCopy[index],
      buyQuantity: cartCopy[index].buyQuantity + cartItem.buyQuantity,
    };
    setCart(cartCopy);
  };

  return (
    <>
      <Router>
        <Layout>
          <Layout.Header>
            <Nav
              cartItemNumber={cart?.length}
              handleShowCart={handleShowCart}
            />

            <Cart
              cart={cart}
              visible={showCart}
              handleShowCart={handleShowCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Layout.Header>
          <Layout.Content className="content">
            <Switch>
              <Route path="/home" exact>
                <Home handleAddToCart={handleAddToCart} foods={foods} />
              </Route>
              <Route path="/sell" exact>
                <Sell
                  chefFoods={chefFoods(foods)}
                  handleAddToCart={handleAddToCart}
                  fetchData={fetchData}
                />
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </>
  );
}

function chefFoods(foods: IFoodItem[]): IFoodItem[] {
  return foods.filter((food) => food.madeByUser === 'kanjurer');
}
