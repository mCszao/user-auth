import { AddressInstance } from './Address';
import { IUser } from '../interface/IUser';
import { DataTypes, Model, Sequelize } from 'sequelize';
import database from '../database/index';

export class UserInstance extends Model<IUser> {
    declare id: string;
    declare name: string;
    declare password: string;
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
            validate: {
                len: {
                    args: [8, 8],
                    msg: 'password can be 8 characters',
                },
            },
        },
        cpf: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'field cpf is empty',
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
        modelName: 'user',
        timestamps: true,
    }
);

UserInstance.hasMany(AddressInstance, {
    foreignKey: 'user_id',
    as: 'addresses',
});
