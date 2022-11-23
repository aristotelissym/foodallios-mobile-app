export interface Purchase {

    id?: string;
    totalPrice: number;
    description: string;
    isValid: boolean;
    createdAt: Date;
    customer: string;
}