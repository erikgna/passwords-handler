export interface ICategory {
    id: number;
    category_name: string;
    user_id: number;
    category_total?: number;
    createdAt?: Date;
    updatedAt?: Date;
}