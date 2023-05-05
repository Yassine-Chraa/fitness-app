export default interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: string;
  reps: number;
  sets: number;
  rest: number;
}
