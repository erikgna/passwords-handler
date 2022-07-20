import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'

import { IUser } from '../interfaces/User'
import Category from './category'
import Password from './password'

class User extends Model<IUser> implements IUser {
    public id!: number
    public email!: string
    public userName!: string
    public password!: string
    public accessToken!: string
    public refreshToken!: string
    public isActive!: boolean;

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
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
  sequelize: sequelizeConnection,
});

User.hasMany(Password, {
    sourceKey: 'id',
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

User.hasMany(Category, {
    sourceKey: 'id',
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

export default User
