import { Avatar, Row, Col, Typography, Button } from 'antd';
import { IUser } from '../Interfaces';

export default function ProfileOverlay({ user }: ProfileOverlayProps) {
  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/logout', {
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.text();
      console.log(data);
      localStorage.removeItem('user');
    } else {
      console.log('Nah! Error logging out bro');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '300px',
        margin: '3px',
        boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '10px',
        borderRadius: '20px',
      }}
    >
      <Row justify="center">
        <Col flex="100px">
          <Avatar
            size={69}
            src="https://grademiners.com/wp-content/uploads/2017/07/Descriptive-Essay-About-a-Person.jpg"
          />
        </Col>

        <Col>
          <Typography.Title level={4}>{user.nameOfUser}</Typography.Title>

          <Button type="link" href="/profile">
            Profile
          </Button>
          <Button type="link" href="/settings">
            Settings
          </Button>
          <Button type="link" onClick={handleLogout}>
            Log Out
          </Button>
        </Col>
      </Row>
    </div>
  );
}

interface ProfileOverlayProps {
  user: IUser;
}