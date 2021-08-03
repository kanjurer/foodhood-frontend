import { createContext } from 'react';
import { IUser } from './Interfaces';

const UserContext = createContext<IUser | null>(null);

export { UserContext };
