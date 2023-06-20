import { UserInstance } from './../models/User';
import { Request, Response } from 'express';
class UserController {
    public async createUser(req: Request, res: Response) {
        try {
            return res.json(await UserInstance.create(req.body));
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar usuário');
        } finally {
            console.log('Transação finalizada');
        }
    }

    public create(req: Request, res: Response) {
        res.json({ message: 'CadastrouOOOO' });
    }
}

export const userController = new UserController();
