import { AddressInstance } from './../models/Address';
import express, { Request, Response, Router } from 'express';
import { BaseResponse } from './../class/BaseResponse';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import MiddlewareCheckValidate from '../class/MiddlewareCheckValidate';
import { userService } from '../service/UserService';
import nodemailer from 'nodemailer';
import Util from '../class/Util';

const router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Você caiu na rota principal',
    });
});

router.use(express.json());

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const record: UserInstance = await userService.add(req.body as IUser);

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
    } catch (error: any) {
        res.status(500)
            .json(
                new BaseResponse(
                    'Não foi possível realizar o cadastro!',
                    error.errors,
                    false
                )
            )
            .send();
    }
});

router.get('/users', async (req: Request, res: Response) => {
    const limit = req.query?.limit as number | undefined;
    const offSet = req.query?.offset as number | undefined;
    try {
        res.json(
            new BaseResponse(
                'Consulta realizada com sucesso',
                await userService.selectAll(limit, offSet),
                true
            )
        );
    } catch (error) {
        res.status(500).json(
            new BaseResponse('Não foi possível realizar a consulta', {}, false)
        );
    } finally {
        console.log('Transação finalizada');
    }
});

router.get('/users/:username', async (req: Request, res: Response) => {
    try {
        return res.json(
            await UserInstance.findOne({
                where: { username: req.params.username },
            })
        );
    } catch (error) {
        res.status(500).json(
            new BaseResponse('Não foi possível realizar a consulta', {}, false)
        );
    } finally {
        console.log('Transação finalizada');
    }
});

router.post(
    '/login',
    MiddlewareCheckValidate.loginValidate,
    async (req: Request, res: Response) => {
        try {
            const { username, password }: IUser = req.body;
            const model: UserInstance | null = await userService.login(
                username,
                password
            );
            res.status(200).json(
                new BaseResponse('Login realizado com sucesso!', model, true)
            );
        } catch (error: any) {
            return res
                .status(500)
                .json(new BaseResponse('Error', error.message, false))
                .send();
        } finally {
            console.log('Transação finalizada');
        }
    }
);

router.post('/user:user_id/address', async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const address = await AddressInstance.create({ ...req.body, user_id });
        if (address) {
            res.status(200)
                .json(
                    new BaseResponse(
                        'Endereço cadastrado com sucesso',
                        address,
                        true
                    )
                )
                .send();
        }
    } catch (error) {
        res.status(500).send('Deu ruim');
    }
});

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
