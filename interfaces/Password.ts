export interface IPassword {
    id: number;
    content_name: string;
    password: string;
    category_id: number;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}