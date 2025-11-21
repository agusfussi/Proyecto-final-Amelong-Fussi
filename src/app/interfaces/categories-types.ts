export interface CategoriesType{
  id: number
  name: string
}

export type NewCategoryType = Omit<CategoriesType,"id">