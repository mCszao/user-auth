import { AddressInstance } from '../models/Address';
import { IAddress } from './../interface/IAddress';
class AddressService {
    public async addByUserId(address: IAddress, id: string) {
        try {
            await AddressInstance.create({ ...address, user_id: id });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default new AddressService();
