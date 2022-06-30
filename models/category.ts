import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import { ICategory } from '../interfaces/Category'
import Password from './password'

class Category extends Model<ICategory> implements ICategory {
    public id!: number
    public categoryName!: string
    public userID!: number
    public categoryTotal!: number
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userID: {
        type: DataTypes.INTEGER,
    },
    categoryTotal: {
        type: DataTypes.INTEGER,
    },
}, {
  sequelize: sequelizeConnection,
})

Category.hasMany(Password, {
    sourceKey: 'id',
    foreignKey: 'categoryID',
    onDelete: 'CASCADE'
});

export default Category
