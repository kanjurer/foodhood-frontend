import './App.css';
import { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';

import { ICartItem, IFoodItem, IUser } from './Interfaces';
import { UserContext } from './Context';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Sell from './Sell/Sell';
import Cart from './Cart/Cart';
import Profile from './Profile/Profile';
import LogIn from './UserEntry/LogIn';
import SignUp from './UserEntry/SignUp';

export default function App() {
  const userSetter = (): IUser | null => {
    let user: IUser | null;
    const userString: string | null = localStorage.getItem('user');

    if (userString == null) {
      user = null;
    } else {
      user = JSON.parse(userString);
    }
    return user;
  };
  let [signedInUser, setSignedInUser] = useState<IUser | null>(userSetter());

  useEffect(() => {
    setSignedInUser(userSetter());
  }, []);

  return (
    <UserContext.Provider value={signedInUser}>
      <MyApp />
    </UserContext.Provider>
  );
}

function MyApp() {
  let [loggedIn, setLoggedIn] = useState<boolean>(false);
  let [foods, setFoods] = useState<IFoodItem[]>([]);
  let [cart, setCart] = useState<ICartItem[]>([]);
  let [showCart, setShowCart] = useState<boolean>(false);

  const user = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoggedIn(Boolean(user));
  }, [user]);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3001/foods', {
        method: 'GET',
      });
      const data = await response.json();
      setFoods(data);
    } catch {
      console.log('Shit');
    }
  }

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
                {!loggedIn ? <Redirect to="/login" /> : <Sell />}
              </Route>
              <Route path="/profile" exact>
                {user === null ? (
                  <Redirect to="/login" />
                ) : (
                  <Profile user={user} />
                )}
              </Route>
              <Route path="/login" exact>
                {loggedIn ? <Redirect to="/home" /> : <LogIn />}
              </Route>
              <Route path="/signup" exact>
                {loggedIn ? <Redirect to="/home" /> : <SignUp />}
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </>
  );
}
