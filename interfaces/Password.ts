export interface IPassword {
    id: number;
    contentName: string;
    password: string;
    categoryID: number;
    userID: number;
    createdAt?: Date;
    updatedAt?: Date;
}