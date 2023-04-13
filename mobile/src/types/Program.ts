export default interface Program {
  id: number;
  owner_id: number;
  title: string;
  main_img: string;
  description: string;
  category: 'maintaining' | 'bulking' | 'cutting';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  isFree: boolean;
  workouts: Array<object>
}
