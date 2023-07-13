import bcrypt from 'bcrypt';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import Util from '../class/Util';

class UserService {
    public async add(user: IUser): Promise<UserInstance> {
        const { uuid, hashedPassword } = await Util.generateUUIDandHash(
            user.password
        );
        return await UserInstance.create({
            ...user,
            id: uuid,
            password: hashedPassword,
        });
    }

    public async selectAll(
        offset: number | undefined,
        limit: number | undefined
    ): Promise<UserInstance[]> {
        console.log('entrei no select');

        return await UserInstance.findAll({
            include: { association: 'addresses', where: {}, limit: 1 },
            where: {},
            limit,
            offset,
        });
    }

    public async login(username: string, password: string) {
        let user = null;
        user = await UserInstance.findOne({
            where: { username: username },
        });
        if (user == null)
            throw new Error('Usuário não cadastrado no banco de dados');
        if (await bcrypt.compare(password, user?.dataValues.password!)) {
            return user;
        } else {
            throw new Error('Senha inválida');
        }
    }

    public async getUserByName(username: string) {
        try {
            return await UserInstance.findOne({
                where: { username },
            });
        } catch (error: any) {
            throw new Error('Error:' + error.errors);
        }
    }
}

export const userService = new UserService();
