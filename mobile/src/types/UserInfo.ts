export default interface UserInfo {
  user:User;
  ratings: Array<{ user_id: number; product_id: number; rating: number }>;
  token: string;
}


export interface User {
  id: number;
  role: 'admin' | 'vip' | 'client' | 'normal_user' | 'coach';
  name: string;
  email: string;
  gender: 'male' | 'female';
  birth_date: Date | String;
  workout_level: 'beginner' | 'intermediate' | 'advanced';
  top_goal: 'Maintaining' | 'bulking' | 'cutting';
  height: number;
  weight: number;
  body_fat: number;
  BMI: number;
  email_verified_at: string | null;
  img_url:string,
  profile: string | null;
  created_at: string;
  updated_at: string;
}