import { IUser } from './IUser';
export interface IAddress {
    user_id?: string;
    street: string;
    city: string;
    number: string;
    zipcode: string;
    district: string;
    address2: string;
}
