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

    withData(message: string, data: any, operationSuccess: boolean) {
        return new BaseResponse(message, data, operationSuccess);
    }

    withoutData(message: string, operationSuccess: boolean) {
        const response = new BaseResponse(message, {}, operationSuccess);
        return response;
    }
}
