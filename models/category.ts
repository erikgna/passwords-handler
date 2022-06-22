import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import { ICategory } from '../interfaces/Category'

class Category extends Model<ICategory> implements ICategory {
    public id!: number
    public category_name!: string
    public password_id!: number
    public category_total!: number
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    category_total: {
        type: DataTypes.INTEGER,
    },
}, {
  sequelize: sequelizeConnection,
})

export default Category
