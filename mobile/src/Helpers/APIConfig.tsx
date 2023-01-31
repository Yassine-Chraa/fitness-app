import User from "../types/User";
import getData from "./Storage/getData";

const baseURL = "http://192.168.68.126:8000";

const endpoints: any = {
  sendEmail: '/api/sendEmail',
  newPassword: '/api/newPassword',
  checkCode: '/api/checkCode',
  SignIn: '/api/signin',
  SignUp: '/api/signup',
  LogOut: '/api/logout',
  DeleteAccount: '/api/deleteAccount',
  Products: '/api/products',
  Users: '/api/users',
  Meals: '/api/meals',
  Equipments: '/api/equipments',
  Activitys: '/api/activitys',
};


export const currentUser = getData('user-info').then((res) => {
  if (res) return JSON.parse(res);
  else return null;
});

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;