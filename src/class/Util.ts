import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { BaseResponse } from './BaseResponse';
class Util {
    public comumFieldValidate(username: string, password: string) {
        if (password === null) {
            return new BaseResponse('password cannot be null', {}, false);
        }
        if (username === null) {
            return new BaseResponse('username cannot be null!', {}, false);
        }

        if (password === '') {
            return new BaseResponse('password cannot be empty', {}, false);
        }
        if (username === '') {
            return new BaseResponse('username cannot be empty!', {}, false);
        }
        return new BaseResponse('passed on middleware', {}, true);
    }

    public async generateUUIDandHash(password: string) {
        return { hashedPassword: await hash(password, 10), uuid: v4() };
    }
}

export default new Util();
