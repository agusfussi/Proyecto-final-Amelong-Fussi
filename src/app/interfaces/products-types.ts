export interface ProductType{
  id: number
  name: string,
  description: string,
  price: number,
  categoryId: number,
  featured: boolean,
  labels: [],
  recommendedFor: string,
  discount: number,
  hasHappyHour: boolean
}
export type NewProductType = Omit<ProductType,"id">