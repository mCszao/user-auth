import { BaseResponse } from './BaseResponse';
import { IUser } from '../interface/IUser';
import { Request, Response, NextFunction } from 'express';
import Util from './Util';
class MiddlewareCheckValidate {
    public async loginValidate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // Object.keys(req.body).forEach((key) => {
        //     if (key != 'password') {
        //         if (key != 'username')
        //             return res
        //                 .status(404)
        //                 .json({
        //                     warning:
        //                         'JSON with not acceptable keys',
        //                 })
        //                 .send();
        //         return res
        //             .status(404)
        //             .json({
        //                 warning:
        //                     'The object send not compatible type of this route request body',
        //             })
        //             .send();
        //     }
        // });

        const { username, password }: IUser = req.body;
        const isValid = Util.comumFieldValidate(username, password);
        if (!isValid?.operationSuccess) {
            return res.status(404).json(isValid).send();
        }
        return next();
    }
}

export default new MiddlewareCheckValidate();
