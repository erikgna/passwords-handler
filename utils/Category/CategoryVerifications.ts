import { CategoryError } from "../../errors/CategoryError";
import { ICategory } from "../../interfaces/Category";

export class CategoryVerifications{
    private _category:ICategory;

    constructor(_category:ICategory){
        this._category = _category;
    }

    verifyCategoryName(){
        if(this._category.category_name.length <= 3) throw new CategoryError(406, "Category name shoud be at least 4 letters");
    }

    verifyCategoryTotal(){
        if(this._category.category_total === 0) throw new CategoryError(406, "Total in creation shoud be zero.");
    }
}