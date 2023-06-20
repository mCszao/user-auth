import userRouter from './userRouter';
import { Request, Response, Router } from 'express';

const router = Router();
router.use([userRouter]);
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Você caiu na rota principal',
    });
});

export default router;
