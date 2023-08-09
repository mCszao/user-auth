import { AddressInstance } from './Address';
import { IUser } from '../interface/IUser';
import { DataTypes, Model } from 'sequelize';

import database from '../database/index';

export class UserInstance extends Model<IUser> {
    declare id: string;
    declare name: string;
    declare password: string;
    declare email: string;
}

UserInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'field id is null',
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'field cpf is empty',
                },
                len: {
                    msg: 'O cpf precisa ter 11 números',
                    args: [10, 11],
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'field email is empty',
                },
                isEmail: {
                    msg: 'field email can be a email example: example@example.com or example@example.com.br',
                },
            },
        },
    },

    {
        sequelize: database,
        modelName: 'users',
        timestamps: true,
    }
);

UserInstance.hasMany(AddressInstance, {
    foreignKey: 'user_id',
    as: 'addresses',
});
