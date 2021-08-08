export interface IDish {
  cuisine: string;
  type: Type;
  nameOfDish: string;
  ingredients: string;
  allergins: string;
  priceInCad: number;
  quantity: number;
}

export interface IFoodItem extends IDish {
  madeByUser: string;
  _id: string;
}

export interface ICartItem extends IFoodItem {
  buyQuantity: number;
}

export type Role = 'consumer' | 'chef';

export type Type = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';

export interface IUser {
  username: string;
  nameOfUser: string;
  role: Role;
}

export interface LogInState {
  username: string;
  password: string;
}

export interface SignUpState {
  username: string;
  password: string;
  nameOfUser: string;
  role: 'consumer';
}

export interface IEditedNameOfUser {
  nameOfUser: string;
}

export interface IEditedPassword {
  oldPassword: string;
  newPassword: string;
}
