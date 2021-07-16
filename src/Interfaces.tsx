export interface IFoodItem {
  _id: string;
  madeByUser: string;
  cuisine: string;
  type: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  nameOfDish: string;
  ingredients: string;
  allergins: string;
  priceInCad: number;
  quantity: number;
  coverPhoto: string;
}

export interface ICartItem extends IFoodItem {
  buyQuantity: number;
}
