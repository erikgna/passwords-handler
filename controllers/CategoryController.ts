import { Request, Response } from "express";
import { IResult } from "../interfaces/Result";
import CategoryService from "../services/category";

class CategoryController extends CategoryService {
    public static async categorys(req: Request, res:Response) {
        const result:IResult = await CategoryService.getAll();
        res.status(result.status).json(result.message);
    }

    public static async oneCategory(req: Request, res:Response){
        const result:IResult = await CategoryService.getById(parseInt(req.params.id));
        res.status(result.status).json(result.message);
    }

    public static async createCategory(req: Request, res:Response){
        const result:IResult = await CategoryService.create(req.body);
        res.status(result.status).json(result.message);
    }

    public static async editCategory(req: Request, res:Response){
        const result:IResult = await CategoryService.update(parseInt(req.params.id), req.body);
        res.status(result.status).json(result.message);
    }

    public static async deleteCategory(req: Request, res:Response){
        const result:IResult = await CategoryService.deleteById(parseInt(req.params.id));
        res.status(result.status).json(result.message);
    }
}

export default CategoryController;