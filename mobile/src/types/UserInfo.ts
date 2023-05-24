import UserType from './UserType'

export default interface UserInfo {
  user:UserType;
  ratings: Array<{ user_id: number; product_id: number; rating: number }>;
  token: string;
}