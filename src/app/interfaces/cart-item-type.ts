import { ProductType } from "./products-types";

export interface CartItemType {
    product: ProductType,
    quantity: number,
    restaurantId: number,
}
