import { IAddress } from './IAddress';

export interface IUser {
    id: string;
    username: string;
    password: string;
    cpf: number;
    email: string;
    Addresses?: Array<IAddress>;
}
