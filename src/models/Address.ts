
import { IAddress } from './../interface/IAddress';
import { DataTypes, Model, Sequelize } from 'sequelize';
import database from '../database/index';

export class AddressInstance extends Model<IAddress> {}

AddressInstance.init(
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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


