import bcrypt from 'bcrypt';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import Util from '../class/Util';

class UserService {
    public async add(user: IUser): Promise<void> {
        const { uuid, hashedPassword } = await Util.generateUUIDandHash(
            user.password
        );
        await UserInstance.create({
            ...user,
            id: uuid,
            password: hashedPassword,
        });
    }

    public async selectAll(
        offset: number | undefined,
        limit: number | undefined
    ): Promise<UserInstance[]> {
        try {
            return await UserInstance.findAll({
                include: { association: 'addresses', where: {}, limit: 1 },
                where: {},
                limit,
                offset,
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async login(
        username: string,
        password: string
    ): Promise<UserInstance | null> {
        let user = null;
        try {
            user = await UserInstance.findOne({
                where: { username: username },
            });
        } catch (error: any) {
            throw new Error(`Usuário não cadastrado`);
        }
        if (await bcrypt.compare(password, user?.dataValues.password!)) {
            return user;
        } else {
            throw new Error('Senha inválida');
        }
    }

    public async selectByName(username: string): Promise<UserInstance | null> {
        try {
            return await UserInstance.findOne({
                where: { username },
                include: { association: 'addresses' },
            });
        } catch (error: any) {
            throw new Error('Error:' + error.errors);
        }
    }
}

export default new UserService();
