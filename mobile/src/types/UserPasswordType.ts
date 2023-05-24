export default interface UserPasswordType {
    id: number,
    password: string,
    nvPassword: string,
    type: 'passwordForm' | 'otherForm',
}