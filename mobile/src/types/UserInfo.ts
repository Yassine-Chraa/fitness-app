export default interface UserInfo {
  user: {
    id: number;
    role: 'admin' | 'vip' | 'client' |'normal_user'| 'coach';
    name: string;
    email: string;
    email_verified_at: string | null;
    profile: string | null;
    created_at: string;
    updated_at: string;
  };
  token: string;
}
