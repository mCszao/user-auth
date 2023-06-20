import { DataTypes, Model } from 'sequelize';
import connectiondb from '../database/connectiondb';

interface UserAttributes {
    id: string;
    username: string;
    password: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize: connectiondb, tableName: 'users', underscored: true }
);
