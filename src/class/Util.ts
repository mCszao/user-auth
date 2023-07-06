import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { BaseResponse } from './BaseResponse';
import nodemailer, { Transporter } from 'nodemailer';
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

    public async sendResetPasswordBuilder(token: string, email: string) {
        const transport: Transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
        });
        transport.sendMail({
            from: 'marc.khk11@gmail.com',
            to: email,
            subject: 'Envio de Teste',
            html: `<p>Clique no <a href='http://localhost:8025/new-password/${token}'>Aqui</a> para resetar sua senha</p>`,
            text: 'chegouuuu',
        });
    }
}

export default new Util();
