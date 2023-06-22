import { IBaseResponse } from './../interface/IBaseResponse';
export class BaseResponse implements IBaseResponse {
    message;
    operationSuccess;
    data;

    constructor(message: string, data: any, operationSuccess: boolean) {
        this.message = message;
        this.operationSuccess = operationSuccess;
        this.data = data;
    }
}
