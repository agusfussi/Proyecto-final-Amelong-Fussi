export interface CategoriesType{
  id: number
  name: string
}

export type NewcategorieType = Omit<CategoriesType,"id">