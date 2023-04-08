import UserInfo from "../types/UserInfo";

const baseURL = 'http://192.168.0.105:8080';

const endpoints: any = {
  SignIn: '/api/signIn',
  SignUp: '/api/signUp',
  DeleteAccount: '/api/deleteAccount',
  ResetPassword: '/password/email',
  Products: '/api/products',
  Cart: '/api/users/cart',
  Meals: '/api/meals',
  Activitys: '/api/activitys',
  Categories: '/api/categories',
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
    workout_level: 'beginner',
    top_goal: 'Maintaining',
    weight: 0,
    body_fat: 0,
    BMI: 0,
  },
  token: '6|TXuZaatP5Oi2raNHyjMbMXiJOHxfglgJRFqxsVQk',
};

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
