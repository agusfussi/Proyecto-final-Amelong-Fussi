export interface ProductType{
  id: any
  name: string,
  description: string,
  price: 0,
  categoryId: 0,
  featured: true,
  labels: [],
  recommendedFor: 0,
  discount: 0,
  hasHappyHour: boolean
}
export type NewProduct = ProductType