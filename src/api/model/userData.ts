export interface IUserData {
    firstname?: string | null,
    lastname?: string | null,
    alias?: string | null
}

export const DefaultUserData: IUserData = {
    firstname: null,
    lastname: null,
    alias: null
}