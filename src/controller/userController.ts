import { Request, Response } from 'express';
import { BaseResponse } from '../class/BaseResponse';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import UserService from '../service/UserService';

class UserController {
    public async signUp(req: Request, res: Response): Promise<Response> {
        try {
            return res
                .status(200)
                .json(
                    new BaseResponse(
                        'Cadastro realizado com sucesso!',
                        await UserService.add(req.body as IUser),
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

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const record = await UserService.login(username, password);
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
            return res
                .status(500)
                .json(new BaseResponse(error.message, {}, false));
        }
    }
    public async getAll(req: Request, res: Response): Promise<Response> {
        const limit = req.query?.limit as number | undefined;
        const offSet = req.query?.offset as number | undefined;
        try {
            return res
                .status(200)
                .json(
                    new BaseResponse(
                        'Consulta realizada com sucesso',
                        await UserService.selectAll(limit, offSet),
                        true
                    )
                );
        } catch (error: any) {
            return res
                .status(500)
                .json(
                    new BaseResponse(
                        'Não foi possível realizar a consulta',
                        {},
                        false
                    )
                );
        }
    }

    public async getByName(req: Request, res: Response): Promise<Response> {
        try {
            return res
                .status(200)
                .json(await UserService.selectByName(req.params.username))
                .send();
        } catch (error: any) {
            return res
                .status(500)
                .json(
                    new BaseResponse(
                        'Não foi possível realizar a consulta',
                        error,
                        false
                    )
                );
        }
    }
    public async getProfile(req: Request, res: Response): Promise<any> {
        const { authorization } = req.headers;
        if (!authorization)
            return res
                .status(401)
                .json(
                    BaseResponse.prototype.withoutData(
                        'authorization field not found in headers',
                        false
                    )
                )
                .send();
        try {
            return res
                .status(200)
                .json(await UserService.selectByID(authorization))
                .send();
        } catch (error: any) {
            return res
                .status(500)
                .json(
                    new BaseResponse(
                        'Não foi possível realizar a consulta',
                        error,
                        false
                    )
                );
        }
    }
}

export default new UserController();
