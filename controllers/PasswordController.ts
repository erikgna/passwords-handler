import { Request, Response } from "express";
import { IResult } from "../interfaces/Result";
import PasswordService from "../services/password";

class PasswordController extends PasswordService {
    public static async passwords(req: Request, res:Response) {
        const result:IResult = await PasswordService.getAll();
        res.status(result.status).json(result.message);
    }

    public static async onePassword(req: Request, res:Response){
        const result:IResult = await PasswordService.getById(parseInt(req.params.id));
        res.status(result.status).json(result.message);
    }

    public static async createPassword(req: Request, res:Response){
        const result:IResult = await PasswordService.create(req.body);
        res.status(result.status).json(result.message);
    }

    public static async editPassword(req: Request, res:Response){
        const result:IResult = await PasswordService.update(parseInt(req.params.id), req.body);
        res.status(result.status).json(result.message);
    }

    public static async deletePassword(req: Request, res:Response){
        const result:IResult = await PasswordService.deleteById(parseInt(req.params.id));
        res.status(result.status).json(result.message);
    }
}

export default PasswordController;