export function nameValidator(name:string) {
  if (!name) return "Name can't be empty."
  if (name.length<=3) return "Name must be at least 3 characters long !"
  return ''
};
