import { products } from './products';

export interface PurchaseHistory{
    billingId:number;
    billingDate:Date;
    products:products;
    quantity:number;
}
