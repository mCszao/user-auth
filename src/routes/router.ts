import { AddressInstance } from './../models/Address';
import express, { Request, Response, Router } from 'express';
import { BaseResponse } from './../class/BaseResponse';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import MiddlewareCheckValidate from '../class/MiddlewareCheckValidate';
import UserService from '../service/UserService';
import UserController from '../controller/userController';
import Util from '../class/Util';
import AddressController from '../controller/AddressController';

const router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json(
        new BaseResponse(
            'You are in default route',
            {
                message: 'Você caiu na rota principal',
            },
            true
        )
    );
});

router.get('/users', UserController.getAll);
router.get('/users/:username', UserController.getByName);

router.post('/signup', UserController.signUp);

router.post(
    '/login',
    MiddlewareCheckValidate.loginValidate,
    UserController.login
);

router.post('/user:user_id/address', AddressController.addAddressByUserId);

router.patch('/forgot-password', async (req: Request, res: Response) => {
    let model = null;
    try {
        const { email } = req.body;
        model = (await UserInstance.findOne({
            attributes: ['id'],
            where: {
                email: email,
            },
        })) as UserInstance | null;
        if (model === null) {
            return res.status(404).send('email não encontrado');
        }
        console.log(model);
        res.redirect('/reset-password/' + model?.id);
    } catch (error: any) {
        res.status(500).json(
            new BaseResponse('Erro no forgot', error.message, false)
        );
    }
});

router.patch(
    '/reset-password/:user_id',
    async (req: Request, res: Response) => {
        console.log('entrou');

        const userId = req.params.user_id;
        const { email } = req.body;
        await Util.sendResetPasswordBuilder(userId, email);
        try {
            res.send(`Seu id é ${userId} e do body ${email}`);
        } catch (error) {
            res.send('Não conseguiu achar ID na rota reset');
        }
    }
);

// router.patch('/new-password/:user_id', async (req: Request, res: Response) => {
//     const { user_id } = req.params;

// });

export default router;
