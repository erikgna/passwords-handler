import * as categoryDal from '../dal/category'
import { CategoryError } from '../errors/CategoryError';
import { ICategory } from '../interfaces/Category'
import { IResult } from '../interfaces/Result'

class CategoryService {
    public static getAll = async (userID: number):Promise<IResult> => {
        try {
            const all:ICategory[] = await categoryDal.getAll(userID);
            return { status: 200, message: all }   
        } catch (error) {
            if(error instanceof CategoryError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }

    public static getById = async (id: number):Promise<IResult> => {
        try {
            const one:ICategory = await categoryDal.getById(id);
    
            return { status: 200, message: one }
        } catch (error) {
            if(error instanceof CategoryError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." };
        }
    }

    public static create = async (payload: ICategory):Promise<IResult> => {
        try {
            payload.categoryTotal = 0;
            const categoryCreated:ICategory = await categoryDal.create(payload);
            return { status: 201, message: categoryCreated }
        } catch (error) {
            if(error instanceof CategoryError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
    
    public static update = async (id: number, payload: any):Promise<IResult> => {
        try {
            const updated:ICategory = await categoryDal.update(id, payload);
            return { status: 200, message: updated }
        } catch (error) {
            if(error instanceof CategoryError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
    
    public static deleteById = async (id: number): Promise<IResult> => {
        try {
            await categoryDal.deleteById(id);
            return { status: 200 }
        } catch (error) {
            if(error instanceof CategoryError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
}

export default CategoryService;