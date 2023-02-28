import UserInfo from '../types/UserInfo';

const baseURL = 'http://192.168.43.41:8000';

const endpoints: any = {
  SignIn: '/api/signIn',
  SignUp: '/api/signUp',
  DeleteAccount: '/api/deleteAccount',
  ResetPassword: '/password/email',
  Products: '/api/products',
  Users: '/api/users',
  Meals: '/api/meals',
  Equipments: '/api/equipments',
  Activitys: '/api/activitys',
  CsrfToken: '/csrf-token',
};

export const currentUser: UserInfo = {
  user: {
    id: 1,
    role: 'admin',
    name: 'Yassine Chraa',
    email: 'yassinechraa@gmail.com',
    email_verified_at: null,
    profile: null,
    created_at: '',
    updated_at: '',
  },
  token: '6|TXuZaatP5Oi2raNHyjMbMXiJOHxfglgJRFqxsVQk',
};

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
