import { UserError } from "../../errors/UserError";
import { IUser } from "../../interfaces/User";

export class UserVerifications{
    private _user:IUser;

    constructor(_user:IUser){
        this._user = _user;
    }

    verifyEmail(){
        if(this._user.email.length <= 5 || !this._user.email.includes('@')) throw new UserError(406, "User email invalid");
    }

    verifyPassword(){
        const specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbers = /[1234567890]+/;
        const upperLetters = /[QWERTYUIOPASDFGHJKLZXCVBNM]+/;

        if(
            this._user.password.length <= 7 ||
            !specials.test(this._user.email) ||
            !numbers.test(this._user.email) ||
            !upperLetters.test(this._user.email)
        ) throw new UserError(406, "Password should be at least 8 characters, at least one special character, one number and one uppercase.");
    }

    verifyName(){
        if(this._user.user_name.length <= 3) throw new UserError(406, "Name must have at least 4 characters");
    }

    verifyActive(){
        if(!this._user.is_active) throw new UserError(400, "Account not actived");
    }
}