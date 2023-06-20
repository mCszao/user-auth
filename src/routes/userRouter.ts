import { userController } from './../controller/UserController';
import express, { Router } from 'express';

const userRouter: Router = Router();
userRouter.use(express.json());
userRouter.post('/signup', userController.createUser);

export default userRouter;
