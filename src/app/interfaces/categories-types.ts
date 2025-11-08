export interface CategoriesType{
  id: string | number
  name: string
}

export type NewcategorieType = Omit<CategoriesType,"id">