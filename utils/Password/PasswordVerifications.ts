import { PasswordError } from "../../errors/PasswordError";
import { IPassword } from "../../interfaces/Password";

export class PasswordVerifications{
    private _password:IPassword;

    constructor(_password:IPassword){
        this._password = _password;
    }

    verifyContentName(){
        if(this._password.content_name.length <= 3) throw new PasswordError(406, "Content name shoud be at least 4 letters");
    }

    verifyPassword(){
        if(this._password.password.length <= 5) throw new PasswordError(406, "Password shoud be at least 6 letters.");
    }
}