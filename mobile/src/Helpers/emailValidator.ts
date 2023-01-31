export function emailValidator(email:string) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email can't be empty !"
  if (!re.test(email)) return 'Oups! Email is not valide !'
  return ''
};
