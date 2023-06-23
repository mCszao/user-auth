import { IBaseResponse } from './../interface/IBaseResponse';
export class BaseResponse implements IBaseResponse {
    message: string;
    operationSuccess: boolean;
    data;

    constructor(message: string, data: any, operationSuccess: boolean) {
        this.message = message;
        this.operationSuccess = operationSuccess;
        this.data = data;
    }
}
