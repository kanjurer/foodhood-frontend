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
