export interface UserType {
    id: string,
    restaurantName: string,
    firstName: string,
    lastName:string,
    address: string,
    password: string,
    phoneNumber: string,
}

export type NewUserType = Omit<UserType,"id">
