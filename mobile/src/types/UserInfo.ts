export default interface UserInfo {
  user?: {
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
    profile: string | null;
    created_at: string;
    updated_at: string;
  };
  ratings: Array<{user_id: number; product_id: number; rating: number}>;
  token: string;
}
