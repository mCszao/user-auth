import { AddressInstance } from './../models/Address';
import express, { Request, Response, Router } from 'express';
import { BaseResponse } from './../class/BaseResponse';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import MiddlewareCheckValidate from '../class/MiddlewareCheckValidate';
import { userService } from '../service/UserService';

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

router.get('/users', async (req: Request, res: Response) => {
    try {
        res.json(
            new BaseResponse(
                'Consulta realizada com sucesso',
                await userService.selectAll(),
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

router.get('/user/:username', async (req: Request, res: Response) => {
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

router.post('/user/:user_id/address', async (req: Request, res: Response) => {
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

export default router;
