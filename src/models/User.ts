import bcrypt, { hash } from 'bcrypt';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import connectiondb from '../database/connectiondb';

export interface UserAttributes {
    id: string;
    username: string;
    password: string;
}

export class UserInstance extends Model<UserAttributes> {
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
            set(value: string) {
                this.setDataValue('id', v4());
            },
            validate: {
                notNull: {
                    msg: 'Id não pode ser nulo',
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
    },
    {
        sequelize: connectiondb,
        tableName: 'users',
        underscored: true,
    }
);
