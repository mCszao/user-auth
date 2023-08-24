import bcrypt from 'bcrypt';
import express, { Request, Response, Router } from 'express';
import { BaseResponse } from './../class/BaseResponse';

import { UserInstance } from '../models/User';
import MiddlewareCheckValidate from '../class/MiddlewareCheckValidate';

import UserController from '../controller/UserController';
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

router.post('/user=:user_id/address', AddressController.addAddressByUserId);

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
            return res
                .status(404)
                .send(new BaseResponse('email não encontrado', {}, false));
        }
        console.log(model);
        await Util.sendResetPasswordBuilder(model.dataValues.id, email);
    } catch (error: any) {
        res.status(500).json(
            new BaseResponse('Error no forgot', error.message, false)
        );
    }
});

router.patch('/new-password/:user_id', async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { previousPassword, newPassword } = req.body;
    try {
        const user = await UserInstance.findByPk(user_id);
        if (user != null) {
            const validPassword = await bcrypt.compare(
                previousPassword,
                user.password
            );
            if (validPassword) {
                const { hashedPassword } = await Util.generateUUIDandHash(
                    newPassword
                );
                user.password = hashedPassword;
                await user.save();
                return res
                    .status(200)
                    .json(
                        new BaseResponse(
                            'Password updated with success',
                            {},
                            true
                        )
                    )
                    .send();
            }
            return res
                .status(404)
                .json(
                    new BaseResponse(
                        'previous password doesnt match with database',
                        {},
                        false
                    )
                )
                .send();
        }
        return res
            .status(404)
            .json(new BaseResponse('User not find', {}, false));
    } catch (error: any) {
        return res
            .status(500)
            .json(
                new BaseResponse('Error no new Password', error.message, false)
            )
            .send();
    }
});

export default router;
