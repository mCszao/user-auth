import { BaseResponse } from './BaseResponse';
import { IUserAttributes } from './../interface/IUserAttributes';
import { Request, Response, NextFunction } from 'express';
import Util from './Util';
class MiddlewareCheckValidate {
    public async loginValidate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { username, password }: IUserAttributes = req.body;
        const isValid = Util.comumFieldValidatie(username, password);
        if (!isValid?.operationSuccess) {
            return res.status(404).json(isValid).send();
        }
        return next();
    }
}

export default new MiddlewareCheckValidate();
