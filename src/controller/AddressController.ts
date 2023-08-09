import { Request, Response } from 'express';
import { BaseResponse } from '../class/BaseResponse';
import AddressService from '../service/AddressService';
class AddressController {
    public async addAddressByUserId(req: Request, res: Response) {
        try {
            res.status(200)
                .json(
                    new BaseResponse(
                        'Endereço cadastrado com sucesso!',
                        await AddressService.addByUserId(
                            req.body,
                            req.params.user_id
                        ),
                        true
                    )
                )
                .send();
        } catch (error: any) {
            res.status(500).json(new Error(error)).send();
        }
    }
}

export default new AddressController();
