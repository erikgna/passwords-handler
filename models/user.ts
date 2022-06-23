import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'

import { IUser } from '../interfaces/User'
import Category from './category'
import Password from './password'

class User extends Model<IUser> implements IUser {
    public id!: number
    public email!: string
    public user_name!: string
    public password!: string
    public access_token!: string
    public refresh_token!: string
    public is_active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
  sequelize: sequelizeConnection,
});

User.hasMany(Password, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Category, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

export default User
