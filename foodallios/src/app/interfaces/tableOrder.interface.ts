export interface TableOrder {

    productId: string;
    purchaseId?: string;
    customer: string;
    title: string;
    quantity: number;
    orderPrice: number;
    createdAt: Date;
    
}