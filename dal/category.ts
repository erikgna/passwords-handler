import { CategoryError } from '../errors/CategoryError'
import { ICategory } from '../interfaces/Category'
import {Category} from '../models'
import { CategoryVerifications } from '../utils/Category/CategoryVerifications';

export const getAll = async (): Promise<ICategory[]> => {
    return Category.findAll(
        {
            order: [["category_name", "DESC"]]
        }
    );
}

export const getById = async (id: number): Promise<ICategory> => {
    const category = await Category.findByPk(id);

    if (!category) throw new CategoryError(406, 'This category was not found');

    return category;
}

export const create = async (payload: ICategory): Promise<ICategory> => {
    const verification:CategoryVerifications = new CategoryVerifications(payload);
    
    verification.verifyCategoryName();
    verification.verifyCategoryTotal();
    
    const category = await Category.create(payload);

    if(!category) throw new CategoryError(400, "Couldn't create category.");

    return category;
}

export const update = async (id: number, payload: ICategory): Promise<ICategory> => {
    const verification:CategoryVerifications = new CategoryVerifications(payload);
    
    verification.verifyCategoryName();
    verification.verifyCategoryTotal();
    
    const category = await Category.findByPk(id);

    if (!category) throw new CategoryError(406, 'This category was not found');

    const updatedCategory = await category.update(payload);

    if(!updatedCategory) throw new CategoryError(400, "Couldn't update category.");

    return updatedCategory;
}

export const deleteById = async (id: number) => {
    const deletedCategoryCount = await Category.destroy({
        where: {id}
    })

    if (deletedCategoryCount === 0) throw new CategoryError(406, 'Category to delete not found');
}