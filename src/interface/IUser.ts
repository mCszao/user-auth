import { IAddress } from './IAddress';

export interface IUser {
    id: string;
    username: string;
    password: string;
    cpf: string;
    email: string;
    Addresses?: Array<IAddress>;
}
