import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import { ICategory } from '../interfaces/Category'
import Password from './password'

class Category extends Model<ICategory> implements ICategory {
    public id!: number
    public category_name!: string
    public user_id!: number
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
    user_id: {
        type: DataTypes.INTEGER,
    },
    category_total: {
        type: DataTypes.INTEGER,
    },
}, {
  sequelize: sequelizeConnection,
})

Category.hasMany(Password, {
    sourceKey: 'id',
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

export default Category
