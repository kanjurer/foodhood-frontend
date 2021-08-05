import './App.less';

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
import Checkout from './Checkout/Checkout';

const userSetter = (): IUser | null => {
  const userString: string | null = localStorage.getItem('user');
  const user: IUser | null =
    userString === null ? null : JSON.parse(userString);

  return user;
};

export default function App() {
  let [signedInUser, setSignedInUser] = useState<IUser | null>(userSetter());

  async function logInFunction(login: boolean): Promise<void> {
    if (login) {
      try {
        const response = await fetch('http://localhost:3001/users/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('user', JSON.stringify(data));
          setSignedInUser(data);
          return;
        }
        localStorage.removeItem('user');
        setSignedInUser(null);
        console.log(await response.text());
      } catch (e) {
        console.log(e);
      }
    } else {
      localStorage.removeItem('user');
      setSignedInUser(null);
    }
  }

  return (
    <UserContext.Provider value={signedInUser}>
      <MyApp logInFunction={logInFunction} />
    </UserContext.Provider>
  );
}

function MyApp({
  logInFunction,
}: {
  logInFunction: (login: boolean) => Promise<void>;
}) {
  const user = useContext(UserContext);
  let loggedIn = Boolean(user);

  let [foods, setFoods] = useState<IFoodItem[]>([]);
  let [cart, setCart] = useState<ICartItem[]>(
    localStorage.getItem('cart') !== null
      ? JSON.parse(localStorage.getItem('cart') as string)
      : []
  );
  let [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

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
    localStorage.setItem('cart', JSON.stringify(newCartCopy));
  };

  const handleShowCart = (): void => {
    setShowCart(!showCart);
  };

  const handleAddToCart = (cartItem: ICartItem): void => {
    const foundItem = cart.find((el) => el._id === cartItem._id);
    if (foundItem === undefined) {
      setCart([...cart, cartItem]);
      localStorage.setItem('cart', JSON.stringify([...cart, cartItem]));
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
    localStorage.setItem('cart', JSON.stringify(cartCopy));
  };

  return (
    <>
      <Router>
        <Layout>
          <Layout.Header>
            <Nav
              logInFunction={logInFunction}
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
          <Layout.Content
            className="content"
            style={{
              padding: ' 10px',
              margin: '10px',
              backgroundColor: 'white',
            }}
          >
            <Switch>
              <Route path="/home" exact>
                <Home handleAddToCart={handleAddToCart} foods={foods} />
              </Route>
              <Route path="/sell" exact>
                {!loggedIn ? (
                  <Redirect to="/login" />
                ) : (
                  <Sell logInFunction={logInFunction} />
                )}
              </Route>
              <Route path="/profile" exact>
                {user === null ? (
                  <Redirect to="/login" />
                ) : (
                  <Profile user={user} />
                )}
              </Route>
              <Route path="/login" exact>
                {loggedIn ? (
                  <Redirect to="/home" />
                ) : (
                  <LogIn logInFunction={logInFunction} />
                )}
              </Route>
              <Route path="/signup" exact>
                {loggedIn ? (
                  <Redirect to="/home" />
                ) : (
                  <SignUp logInFunction={logInFunction} />
                )}
              </Route>
              <Route path="/checkout" exact>
                {loggedIn ? (
                  <Checkout
                    handleRemoveFromCart={handleRemoveFromCart}
                    cart={cart}
                  />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </>
  );
}
