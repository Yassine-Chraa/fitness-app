import User from "../types/User";

const baseURL = "http://192.168.1.3:8000";

const endpoints: any = {
  SignIn: '/api/signIn',
  SignUp: '/api/signUp',
  LogOut: '/api/logout',
  DeleteAccount: '/api/deleteAccount',
  Products: '/api/products',
  Users: '/api/users',
  Meals: '/api/meals',
  Equipments: '/api/equipments',
  Activitys: '/api/activitys',
};

export const currentUser: User = {
  id: 1,
  role: 'admin',
  name: 'Yassine Chraa',
  email: 'yassinechraa@gmail.com',
  email_verified_at: null,
  profile: null,
  created_at: '',
  updated_at: '',
  token: '6|TXuZaatP5Oi2raNHyjMbMXiJOHxfglgJRFqxsVQk',
};

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;