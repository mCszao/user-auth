import userController from './userController';
import { Request, Response, Router } from 'express';

const router = Router();
router.use([userController]);
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Você caiu na rota principal',
    });
});

export default router;
