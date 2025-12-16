export interface ProductType{
  id: number,
  name: string,
  description: string,
  price: number,
  categoryId: number,
  featured: boolean,
  labels: string[],
  recommendedFor: number,
  discount: number,
  hasHappyHour: boolean,
  userId: number,
  categoryName: string,
  restaurantName?: string
}
export type NewProductType = Omit<ProductType,"id">

export interface setDiscountType {
  discount: number,
}