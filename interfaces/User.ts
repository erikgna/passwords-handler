export interface IUser {
    id: number;
    email: string;
    user_name: string;
    password: string;
    access_token: string;
    refresh_token: string;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}