import { IAddress } from './IAddress';

export interface IUser {
    id: string;
    username: string;
    password: string;
    Addresses?: Array<IAddress>;
}
