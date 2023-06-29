import { UserInstance } from './User';
import { IUser } from './../interface/IUser';
import { IAddress } from './../interface/IAddress';
import { DataTypes, Model, Sequelize } from 'sequelize';
import database from '../database/index';

export class AddressInstance extends Model<IAddress> {}

AddressInstance.init(
    {
        street: {
            type: DataTypes.STRING,
        },
        number: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        zipcode: {
            type: DataTypes.STRING,
        },
        district: {
            type: DataTypes.STRING,
        },
        address2: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: database,
        modelName: 'address',
        timestamps: true,
    }
);
