interface IPasswordError extends Omit<Error, 'name'>{
    status:number;
    message: string;
}

export class PasswordError implements IPasswordError {
    status: number;
    message: string;
	
	constructor(status: number, message: string){
		this.status = status;
        this.message = message;
	}
}
