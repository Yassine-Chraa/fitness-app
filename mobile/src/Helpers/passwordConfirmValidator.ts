export function passwordConfirmValidator(a: string, b: string) {
    if (a != b) return 'Confirm your password correctly !'
    return ''
}