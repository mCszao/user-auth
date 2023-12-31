import bcrypt from 'bcrypt';
import { IUser } from '../interface/IUser';
import { UserInstance } from '../models/User';
import Util from '../class/Util';
import { sign, verify } from 'jsonwebtoken';

type Payload = {
    id: number;
};
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

    public async login(username: string, password: string): Promise<any> {
        let user = null;
        try {
            user = await UserInstance.findOne({
                attributes: ['id', 'username', 'password'],
                where: { username: username },
                include: { association: 'addresses' },
            });
            if (user == null) throw new Error('Usuário não cadastrado');
            if (await bcrypt.compare(password, user?.password!)) {
                const { password, ...restUser } = user.dataValues;
                const token = sign({ id: restUser.id }, 'studyOnly', {
                    expiresIn: '6h',
                });
                return {
                    userData: restUser,
                    accessToken: token,
                };
            } else {
                throw new Error('Senha inválida');
            }
        } catch (error: any) {
            throw new Error(error.message);
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

    public async selectByID(token: string): Promise<UserInstance | null> {
        const beautyToken =
            token.split(' ').length > 1 ? token.split(' ')[1] : token;
        const { id } = verify(beautyToken, 'studyOnly') as Payload;
        try {
            return await UserInstance.findByPk(id, {
                include: { association: 'addresses' },
            });
        } catch (error: any) {
            throw new Error('Error:' + error.errors);
        }
    }
}

export default new UserService();
