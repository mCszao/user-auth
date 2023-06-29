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
            allowNull: false,
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
