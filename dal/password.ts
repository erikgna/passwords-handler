require('dotenv').config()

import { PasswordError } from '../errors/PasswordError'
import { IPassword } from '../interfaces/Password'
import { Category, Password } from '../models'
import { PasswordVerifications } from '../utils/Password/PasswordVerifications';

export const getAll = async (userID: number): Promise<IPassword[]> => {
    const passwords = await Password.findAll(
        {
            where: { userID },
            order: [["contentName", "DESC"]]
        }
    );

    return passwords;
}

export const getById = async (id: number): Promise<IPassword> => {
    const password = await Password.findByPk(id);

    if (!password) throw new PasswordError(406, 'This password was not found');

    return password;
}

export const create = async (payload: IPassword): Promise<IPassword> => {
    const verification:PasswordVerifications = new PasswordVerifications(payload);

    const category = await Category.findOne({where: { id: payload.categoryID }});

    if(category?.userID !== payload.userID) throw new PasswordError(400, "Couldn't create password.");

    verification.verifyContentName();
    verification.verifyPassword();

    const password = await Password.create(payload);

    if(!password) throw new PasswordError(400, "Couldn't create password.");

    return password;
}

export const update = async (id: number, payload: IPassword): Promise<IPassword> => {
    const verification:PasswordVerifications = new PasswordVerifications(payload);
    
    verification.verifyContentName();
    verification.verifyPassword();
    
    const password = await Password.findByPk(id);

    if (!password) throw new PasswordError(406, 'This password was not found');

    const updatedPassword = await password.update(payload);

    if(!updatedPassword) throw new PasswordError(400, "Couldn't update password");

    return updatedPassword;
}

export const deleteById = async (id: number) => {
    const deletedPasswordCount = await Password.destroy({
        where: {id}
    })

    if (deletedPasswordCount === 0) throw new PasswordError(406, 'Password to delete not found');
}