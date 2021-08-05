import * as Yup from 'yup';
import { Modal } from 'antd';
import { Form, Input, Select, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import { IDish, IFoodItem } from '../Interfaces';

export default function SellFoodModal(props: SellFoodModalProps) {
  let { visible, handleCancel, fetchChefData } = props;

  const handlePost = (values: IDish) => {
    fetch(`http://localhost:3001/user/chefPosts`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        console.log(values);
        if (res.ok) {
          fetchChefData();
          handleCancel();
        } else {
          return res.text();
        }
      })
      .then((data) => console.log(data));

    handleCancel();
  };

  return (
    <>
      <Formik
        validationSchema={FoodSchema}
        initialValues={{
          cuisine: '',
          type: 'Vegan' as 'Vegetarian' | 'Non-Vegetarian' | 'Vegan',
          nameOfDish: '',
          ingredients: '',
          allergins: '',
          priceInCad: 0,
          quantity: 0,
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handlePost(values);
          setSubmitting(false);
        }}
      >
        <Modal
          destroyOnClose={true}
          visible={visible}
          title="Post a Food"
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item
              name="nameOfDish"
              label="Name Of Food"
              tooltip="Choose a nice name"
              required
            >
              <Input name="nameOfDish" placeholder="Tandoori Chicken" />
            </Form.Item>
            <Form.Item
              name="cuisine"
              label="Cuisine"
              tooltip={'Tooltip with customize icon'}
            >
              <Input placeholder="Indian" name="cuisine" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type of Food"
              tooltip={'It helps user pick the right food!'}
              required
            >
              <Select name="type">
                <Select.Option value="Vegetarian">Vegetarian</Select.Option>
                <Select.Option value="Non-Vegetarian">
                  Non-Vegetarian
                </Select.Option>
                <Select.Option value="Vegan">Vegan</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="ingredients"
              label="Ingredients"
              tooltip={'It gives users a brief idea about the dish'}
            >
              <Input
                type="textarea"
                name="ingredients"
                placeholder="Chicken, Spices, Garlic, Peanuts"
              />
            </Form.Item>
            <Form.Item
              name="allergins"
              label="Allergins"
              tooltip={'Helps users choose the right dish'}
            >
              <Input type="textarea" placeholder="Peanuts" name="allergins" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Stock Quantity"
              tooltip={'Pick the stock number'}
            >
              <Input type="number" placeholder="10" name="quantity" min={1} />
            </Form.Item>
            <Form.Item
              name="priceInCad"
              label="Set Price (CAD$) / meal"
              tooltip={'Pick the right price for your dish'}
            >
              <Input
                type="number"
                placeholder="4.95"
                name="priceInCad"
                min={0.99}
                max={49.99}
              />
            </Form.Item>
            <SubmitButton>Submit</SubmitButton>,
          </Form>
        </Modal>
      </Formik>
    </>
  );
}

interface SellFoodModalProps {
  visible: boolean;
  handleCancel: () => void;
  fetchChefData: () => void;
  dish?: IFoodItem;
}

const FoodSchema = Yup.object().shape({
  cuisine: Yup.string().required('Required'),
  nameOfDish: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  ingredients: Yup.string().min(3, 'Too Short!'),
  allergins: Yup.string().min(3, 'Too Short!').max(14, 'Too Long!'),
  priceInCad: Yup.number()
    .min(0.99, 'Minimum price should be 0.99$')
    .max(49.99, 'Maximum price is 49.99'),
  quantity: Yup.number().min(1, 'Minimum quantity is 1!'),
  type: Yup.string().oneOf(['Vegetarian', 'Non-Vegetarian', 'Vegan']),
});
