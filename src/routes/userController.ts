import { v4 } from 'uuid';
import { BaseResponse } from './../class/BaseResponse';
import bcrypt from 'bcrypt';
import { IUserAttributes } from '../interface/IUserAttributes';
import express, { Request, Response, Router } from 'express';
import { UserInstance } from '../models/User';
import { Error, Model, where } from 'sequelize';
import MiddlewareCheckValidate from '../class/MiddlewareCheckValidate';

const userController: Router = Router();
userController.use(express.json());

userController.post('/signup', async (req: Request, res: Response) => {
    const newUser: IUserAttributes = req.body;
    try {
        const hashed: string = await bcrypt.hash(newUser.password, 10);
        const id: string = v4();
        const record: UserInstance = await UserInstance.create({
            ...newUser,
            id,
            password: hashed,
        });

        return res
            .status(200)
            .json(
                new BaseResponse(
                    'Cadastro realizado com sucesso!',
                    record,
                    true
                )
            )
            .send();
    } catch (error) {
        res.status(500)
            .json(
                new BaseResponse(
                    'Não foi possível realizar o cadastro!',
                    error,
                    false
                )
            )
            .send();
    } finally {
        console.log('Transação finalizada');
    }
});

userController.get('/users', async (req: Request, res: Response) => {
    try {
        res.json(await UserInstance.findAll());
    } catch (error) {
        console.error(Error.captureStackTrace);
    } finally {
        console.log('Transação finalizada');
    }
});

userController.get('/user/:id', async (req: Request, res: Response) => {
    try {
        return res.json(await UserInstance.findByPk(req.params.id));
    } catch (error) {
        console.log('Transação finalizada');
    } finally {
        console.log('Transação finalizada');
    }
});

userController.post(
    '/login',
    MiddlewareCheckValidate.loginValidate,
    async (req: Request, res: Response) => {
        const user: IUserAttributes = req.body;
        try {
            const model: UserInstance | null = await UserInstance.findOne({
                where: { username: user.username },
            });
            console.log(
                model?.dataValues.password + 'senha req' + user.password
            );
            if (model === null) {
                return res
                    .status(404)
                    .json(new BaseResponse('Usuário não encontrado', {}, false))
                    .send();
            }
            if (
                await bcrypt.compare(user.password, model.dataValues.password)
            ) {
                return res.json(
                    new BaseResponse('Login Efetuado com sucesso!', model, true)
                );
            } else {
                return res.json(
                    new BaseResponse('Credenciais incorretas!', {}, false)
                );
            }
        } catch (error) {
            return new BaseResponse('Error não catalogado', error, false);
        }
    }
);

export default userController;
