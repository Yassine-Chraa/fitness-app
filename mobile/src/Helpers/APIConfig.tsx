import {API_URL} from "@env";

const endpoints: any = {
  SignIn: '/api/signIn',
  SignUp: '/api/signUp',
  DeleteAccount: '/api/deleteAccount',
  ResetPassword: '/password/email',
  Products: '/api/products',
  Cart: '/api/users/cart',
  DailyNutrition: '/api/users/dailyNutrition',
  Meals: '/api/meals',
  Users: '/api/users',
  Activitys: '/api/activitys',
  Categories: '/api/categories',
  CsrfToken: '/csrf-token',
};

export function getUrl(endpoint: PropertyKey) {
  return API_URL + endpoints[endpoint];
}

export default endpoints;
