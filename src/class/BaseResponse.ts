import { IBaseResponse } from './../interface/IBaseResponse';
export class BaseResponse implements IBaseResponse {
    message;
    data;
    constructor(message: string, data: any) {
        this.message = message;
        this.data = data;
    }
}
