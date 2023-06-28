import bcrypt from 'bcrypt';
import { IUserAttributes } from './../interface/IUserAttributes';
import { UserInstance } from '../models/User';
import Util from '../class/Util';

class UserService {
    public async add(user: IUserAttributes): Promise<UserInstance> {
        const { uuid, hashedPassword } = await Util.generateUUIDandHash(
            user.password
        );
        return await UserInstance.create({
            ...user,
            id: uuid,
            password: hashedPassword,
        });
    }

    public async selectAll(): Promise<UserInstance[]> {
        return await UserInstance.findAll();
    }

    public async login(username: string, password: string) {
        let user = null;
        try {
            user = await UserInstance.findOne({
                where: { username: username },
            });
        } catch (error) {
            throw new Error('Usuário não encontrado');
        }
        if (await bcrypt.compare(password, user?.dataValues.password!)) {
            return user;
        } else {
            throw new Error('Senha inválida');
        }
    }
}

export const userService = new UserService();
