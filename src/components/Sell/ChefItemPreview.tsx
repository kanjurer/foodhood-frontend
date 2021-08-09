import { Modal, Button, Typography, Tag, Space, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { IFoodItem } from '../../Interfaces';

export default function ChefItemPreview(props: ChefItemPreviewProps) {
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
        <Image
          alt="example"
          src={food.coverPhoto}
          preview={false}
          fallback="https://media.istockphoto.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?b=1&k=6&m=1218254547&s=170667a&w=0&h=EXwwoHJ3wI0H2jDfoFhqOiIo2c4cL0y7R8Gop3iIO30="
        />
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

interface ChefItemPreviewProps {
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
    <Tag key="type" color={typeColor}>
      {food.type}
    </Tag>,
    <Tag key="cuisine" color="magenta">
      {food.cuisine}
    </Tag>,
  ];
}
