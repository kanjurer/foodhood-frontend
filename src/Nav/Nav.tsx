import './Nav.css';

import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Menu, Space, Button, Badge, Drawer, Dropdown } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  MenuOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { UserContext } from '../Context';
import ProfileOverlay from './ProfileOverlay';
import Cart from '../Cart/Cart';
import { ICartItem } from '../Interfaces';

export default function Nav({
  cart,
  logInFunction,
  cartItemNumber,
  handleRemoveFromCart,
}: NavProps) {
  let [collapsed, setCollapsed] = useState<boolean>(true);
  let [showCart, setShowCart] = useState<boolean>(false);
  const user = useContext(UserContext);

  const handleShowCart = (): void => {
    setShowCart(!showCart);
  };

  return (
    <>
      <div className="nav">
        <Row>
          <Col span={4}>
            <Button
              type="text"
              size="large"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(false)}
            />
            <Drawer
              title={'foodhood'}
              visible={!collapsed}
              placement="left"
              onClose={() => setCollapsed(true)}
            >
              <Menu
                mode="inline"
                selectedKeys={[useLocation().pathname]}
                style={{ width: '250px', marginLeft: '-20px' }}
                onSelect={() => setCollapsed(true)}
              >
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                  <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="/sell" icon={<MoneyCollectOutlined />}>
                  <Link to="/sell">Sell</Link>
                </Menu.Item>
              </Menu>
            </Drawer>
          </Col>
          <Col xs={10} sm={12} md={14} lg={15} xl={16}>
            <div />
          </Col>
          <Col xs={8} sm={8} md={6} lg={5} xl={4}>
            <Space>
              <Button type="text" icon={<BellOutlined />} shape="round" />
              {user && (
                <Dropdown
                  overlay={
                    <ProfileOverlay logInFunction={logInFunction} user={user} />
                  }
                  trigger={['click']}
                >
                  <Button
                    type="text"
                    icon={<UserOutlined />}
                    shape="round"
                    href="/profile"
                  />
                </Dropdown>
              )}

              <Badge count={cartItemNumber}>
                <Button
                  className="cart-button"
                  type="primary"
                  shape="round"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleShowCart}
                />
              </Badge>
            </Space>
          </Col>
        </Row>
      </div>
      <Cart
        cart={cart}
        visible={showCart}
        handleShowCart={handleShowCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
    </>
  );
}

interface NavProps {
  handleRemoveFromCart: (cartItem: ICartItem) => void;
  cart: ICartItem[];
  cartItemNumber: number | undefined;
  logInFunction: (user: boolean) => void;
}
