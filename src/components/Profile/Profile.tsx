import { Image, Typography, Row, Col, Tag, Divider } from 'antd';

import { IUser } from '../../Interfaces';

export default function Profile({ user }: ProfileProps) {
  const { username, nameOfUser, role } = user;
  return (
    <div>
      <Row justify="center">
        <Col flex="350px">
          <Image
            style={{ borderRadius: '20px' }}
            width={340}
            src="https://grademiners.com/wp-content/uploads/2017/07/Descriptive-Essay-About-a-Person.jpg"
          />
        </Col>
        <Col flex="auto">
          <Typography>
            <Typography.Title level={1}>
              {nameOfUser + ' '}
              <Typography.Text type="secondary">@{username}</Typography.Text>
            </Typography.Title>
            <Tag color="red">{role}</Tag>
          </Typography>
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={1}>Your orders</Typography.Title>

      <div>orders</div>
    </div>
  );
}

interface ProfileProps {
  user: IUser;
}
