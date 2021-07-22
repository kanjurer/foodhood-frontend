import { Modal, Button, Typography, Tag, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { IFoodItem } from '../Interfaces';

export default function FoodItemModal(props: FoodItemModalProps) {
  let { visible, handleCancel, food, handleSellFoodModal } = props;

  const handleEdit = () => {
    handleCancel();
    handleSellFoodModal();
  };
  const tags = generateTags(food);

  return (
    <>
      <Modal
        destroyOnClose={true}
        visible={visible}
        title={
          <>
            <Space size={40}>
              <h2>{food.nameOfDish} </h2>
              <h1>{tags}</h1>
            </Space>{' '}
            <br />
            <Typography.Text type="secondary">
              By {food.madeByUser}
            </Typography.Text>
          </>
        }
        onCancel={handleCancel}
        footer={[
          <Button
            key="edit"
            shape="round"
            icon={<EditOutlined />}
            onClick={handleEdit}
          />,
        ]}
      >
        <img alt="cover" style={{ width: '450px' }} src="img.jpg" />
        <Typography.Title level={5}>Ingredients:</Typography.Title>
        {food.ingredients}
        <br />
        <br />

        <Typography.Title level={5}>Allergins:</Typography.Title>
        {food.allergins}
      </Modal>
    </>
  );
}

interface FoodItemModalProps {
  visible: boolean;
  handleCancel: () => void;
  food: IFoodItem;
  handleSellFoodModal: () => void;
}

function generateTags(food: IFoodItem) {
  let typeColor: 'red' | 'green' | 'yellow';
  if (food.type === 'Vegetarian') {
    typeColor = 'yellow';
  } else if (food.type === 'Non-Vegetarian') {
    typeColor = 'red';
  } else {
    typeColor = 'green';
  }

  return [
    <Tag color={typeColor}>{food.type}</Tag>,
    <Tag color="magenta">{food.cuisine}</Tag>,
  ];
}
