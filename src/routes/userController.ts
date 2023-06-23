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
        try {
            const { username, password }: IUserAttributes = req.body;
            const model: UserInstance | null = await UserInstance.findOne({
                where: { username: username },
            });
            console.log(
                'Senha banco' +
                    model?.dataValues.password +
                    'senha req' +
                    password
            );
            if (model === null) {
                return res
                    .status(404)
                    .json(new BaseResponse('Usuário não encontrado', {}, false))
                    .send();
            }
            if (await bcrypt.compare(password, model?.dataValues.password)) {
                return res
                    .status(200)
                    .json(
                        new BaseResponse(
                            'Login Efetuado com sucesso',
                            model.dataValues,
                            true
                        )
                    )
                    .send();
            } else {
                return res
                    .status(404)
                    .json(new BaseResponse('Credênciais incorretas', {}, false))
                    .send();
            }
        } catch (error) {
            return res
                .status(500)
                .json(new BaseResponse('Usuário não cadastrado', error, false))
                .send();
        } finally {
            console.log('Transação finalizada');
        }
    }
);

export default userController;
