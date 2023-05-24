import {API_URL} from '@env';

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
  Programs: '/api/programs',
  UserPrograms: '/api/users/programs',
  Workouts: '/api/workouts',
  WorkoutExercises: '/api/workoutexercises',
  Exercises: '/api/exercises',
  Categories: '/api/categories',
  FeedBacks: '/api/feedbacks',
  CsrfToken: '/csrf-token',
};

export function getUrl(endpoint: PropertyKey) {
  console.log(API_URL)
  return '192.168.0.106' + endpoints[endpoint];
}

export default endpoints;
