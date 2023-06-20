import { BaseResponse } from './../class/BaseResponse';

import { UserAttributes } from './../models/User';
import express, { Request, Response, Router } from 'express';
import { UserInstance } from '../models/User';
import { Model, where } from 'sequelize';
import { uuid } from 'uuidv4';
const userController: Router = Router();
userController.use(express.json());

userController.post('/signup', async (req: Request, res: Response) => {
    const id = uuid();
    try {
        const record: Model<UserAttributes> = await UserInstance.create({
            ...req.body,
            id,
        });
        return res.json(
            new BaseResponse('Cadastro realizado com sucesso!', record)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar usuário');
    } finally {
        console.log('Transação finalizada');
    }
});

userController.get('/users', async (req: Request, res: Response) => {
    try {
        res.json(await UserInstance.findAll());
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar todos usuários');
    }
});

userController.get('/user/:id', async (req: Request, res: Response) => {
    try {
        return res.json(await UserInstance.findOne());
    } catch (error) {}
});

export default userController;
