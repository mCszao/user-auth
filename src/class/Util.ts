import { BaseResponse } from './BaseResponse';
class Util {
    public comumFieldValidatie(username: string, password: string) {
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
    }
}

export default new Util();
