export default interface UserType {
    id: number;
    role: 'admin' | 'vip' | 'client' | 'coach' | 'user';
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
    img_url: string,
    created_at: string;
    updated_at: string;
}