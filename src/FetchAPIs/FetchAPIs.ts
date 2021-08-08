import axios from 'axios';
import { IDish, IFoodItem } from '../Interfaces';

import {
  IEditedNameOfUser,
  IEditedPassword,
  LogInState,
  SignUpState,
} from '../Interfaces';

axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.withCredentials = true;

export async function signUpUser(values: SignUpState) {
  return await axios({
    url: '/signup',
    method: 'POST',
    data: values,
  });
}

export async function getFoods() {
  return await axios({
    url: '/foods',
    method: 'GET',
  });
}

export async function getFoodItem(id: string) {
  return await axios({
    url: `/foods/${id}`,
    method: 'GET',
  });
}

export async function getAuthenticatedUser() {
  return await axios({
    url: '/user',
    method: 'GET',
  });
}
export async function changeNameOfUser(user: IEditedNameOfUser) {
  return await axios({
    url: '/user/nameOfUser',
    method: 'PUT',
    data: user,
  });
}

export async function changePasswordOfUser(user: IEditedPassword) {
  return await axios({
    url: '/user/password',
    method: 'PUT',
    data: user,
  });
}

export async function getChefFoods() {
  return await axios({
    url: '/chefPosts',
    method: 'GET',
  });
}

export async function postChefFood(dish: IDish) {
  const form = new FormData();
  Object.keys(dish).forEach((key) => {
    form.append(key, (dish as any)[key]);
  });

  return await axios({
    url: `/chefPosts`,
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      credentials: 'include',
    },
  });
}

export async function deleteChefFood(id: string) {
  return await axios({
    url: `/chefPosts/${id}`,
    method: 'DELETE',
  });
}

export async function updateChefFood(id: string, food: IDish) {
  const form = new FormData();
  Object.keys(food).forEach((key) => {
    form.append(key, (food as any)[key]);
  });

  return await axios({
    url: `/chefPosts/${id}`,
    method: 'PUT',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      credentials: 'include',
    },
  });
}

export async function logInUser(values: LogInState) {
  return await axios({
    url: '/login',
    method: 'POST',

    data: values,
  });
}

export async function logOutUser() {
  return await axios({
    url: '/logout',
    method: 'POST',
  });
}
