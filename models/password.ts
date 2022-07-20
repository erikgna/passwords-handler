import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import { IPassword } from '../interfaces/Password'

class Password extends Model<IPassword> implements IPassword {
    public id!: number
    public categoryID!: number
    public userID!: number
    public contentName!: string
    public password!: string
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Password.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryID: {
        type: DataTypes.INTEGER,
    },
    userID: {
        type: DataTypes.INTEGER,
    },
    contentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
  sequelize: sequelizeConnection,
})

export default Password