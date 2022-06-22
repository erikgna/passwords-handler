interface IUserError extends Omit<Error, 'name'>{
    status:number;
    message: string;
}

export class UserError implements IUserError {
    status: number;
    message: string;
	
	constructor(status: number, message: string){
		this.status = status;
        this.message = message;
	}
}
