import { Request, Response } from 'express';
import { BaseResponse } from '../class/BaseResponse';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import { userService } from '../service/UserService';

class UserController {
    public async signUp(req: Request, res: Response): Promise<Response> {
        try {
            const record: UserInstance = await userService.add(
                req.body as IUser
            );
            return res
                .status(200)
                .json(
                    new BaseResponse(
                        'Cadastro realizado com sucesso!',
                        record,
                        true
                    )
                );
        } catch (error: any) {
            return res
                .status(500)
                .json(
                    new BaseResponse(
                        'Não foi possível realizar o cadastro!',
                        error.errors,
                        false
                    )
                )
                .send();
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const record = await userService.login(username, password);
            return res
                .status(200)
                .json(
                    new BaseResponse(
                        'Login realizado com sucesso!',
                        record,
                        true
                    )
                );
        } catch (error: any) {
            res.status(500).json(
                new BaseResponse('Error', error.message, false)
            );
        }
    }
    public async getAll(req: Request, res: Response) {
        const limit = req.query?.limit as number | undefined;
        const offSet = req.query?.offset as number | undefined;
        try {
            res.status(200).json(
                new BaseResponse(
                    'Consulta realizada com sucesso',
                    await userService.selectAll(limit, offSet),
                    true
                )
            );
        } catch (error: any) {
            res.status(500).json(
                new BaseResponse(
                    'Não foi possível realizar a consulta',
                    {},
                    false
                )
            );
        }
    }

    public async getByName(req: Request, res: Response) {
        try {
            return res.json()
        } catch (error) {
            
        }
    }
}

export default new UserController();
