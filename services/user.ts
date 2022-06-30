import * as userDal from '../dal/user'
import { UserError } from '../errors/UserError';
import { IToken, IUser } from '../interfaces/User';
import { IResult } from '../interfaces/Result'

class UserService {
    public static loginService = async (payload: IUser):Promise<IResult> => {
        try {
            const token:IToken = await userDal.login(payload);
    
            return { status: 200, message: token }
        } catch (error) {
            if(error instanceof UserError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." };
        }
    }

    public static create = async (payload: IUser):Promise<IResult> => {
        try {
            payload.isActive = false;
            const token:IToken = await userDal.create(payload);
            return { status: 201, message: token }
        } catch (error) {
            if(error instanceof UserError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    }
    
    public static delete = async (payload: IUser): Promise<IResult> => {
        try {
            await userDal.deleteUser(payload);
            return { status: 200 }
        } catch (error) {
            if(error instanceof UserError) return { status: error.status, message: error.message };
            return { status: 500, message: "An internal error ocurred." }
        }
    
    }
}

export default UserService;