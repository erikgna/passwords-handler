import * as passwordDal from '../dal/password'
import { PasswordError } from '../errors/PasswordError';
import { IPassword } from '../interfaces/Password';
import { IResult } from '../interfaces/Result'

class PasswordService {
    public static getAll = async (user_id: number):Promise<IResult> => {
        try {
            const all:IPassword[] = await passwordDal.getAll(user_id);
            return { status: 200, message: all }   
        } catch (error) {
            if(error instanceof PasswordError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }

    public static getById = async (id: number):Promise<IResult> => {
        try {
            const one:IPassword = await passwordDal.getById(id);
    
            return { status: 200, message: one }
        } catch (error) {
            if(error instanceof PasswordError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." };
        }
    }

    public static create = async (payload: IPassword):Promise<IResult> => {
        try {
            await passwordDal.create(payload);
            return { status: 201 }
        } catch (error) {
            if(error instanceof PasswordError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
    
    public static update = async (id: number, payload: any):Promise<IResult> => {
        try {
            const updated:IPassword = await passwordDal.update(id, payload);
            return { status: 200, message: updated }
        } catch (error) {
            if(error instanceof PasswordError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
    
    public static deleteById = async (id: number): Promise<IResult> => {
        try {
            await passwordDal.deleteById(id);
            return { status: 200 }
        } catch (error) {
            if(error instanceof PasswordError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
}

export default PasswordService;