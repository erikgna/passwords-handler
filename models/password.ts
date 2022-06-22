import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import { IPassword } from '../interfaces/Password'

class Password extends Model<IPassword> implements IPassword {
    public id!: number
    public content_name!: string
    public password!: string
    public category_id!: number
    public user_id!: number
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Password.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
}, {
  sequelize: sequelizeConnection,
})

export default Password
