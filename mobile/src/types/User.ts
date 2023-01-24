export default interface User {
  id: number;
  role: 'admin' | 'vip' | 'client' | 'coach' | 'doctar';
  name: string;
  email: string;
  email_verified_at: string | null;
  profile: string | null;
  created_at: string;
  updated_at: string;
  token: string;
}
