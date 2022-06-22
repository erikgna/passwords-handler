interface ICategoryError extends Omit<Error, 'name'>{
    status:number;
    message: string;
}

export class CategoryError implements ICategoryError {
    status: number;
    message: string;
	
	constructor(status: number, message: string){
		this.status = status;
        this.message = message;
	}
}
