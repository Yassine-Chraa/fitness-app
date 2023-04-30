const baseURL = 'http://192.168.0.105:8080';

const endpoints: any = {
  SignIn: '/api/signIn',
  SignUp: '/api/signUp',
  DeleteAccount: '/api/deleteAccount',
  ResetPassword: '/password/email',
  Products: '/api/products',
  Cart: '/api/users/cart',
  Meals: '/api/meals',
  Users: '/api/users',
  Programs: '/api/programs',
  UserPrograms: '/api/users/programs',
  Workouts: '/api/workouts',
  ProgramWorkouts: '/api/programs/workouts',
  Exercises: '/api/exercises',
  Categories: '/api/categories',
  FeedBacks: '/api/feedbacks',
  CsrfToken: '/csrf-token',
};

export function getUrl(endpoint: PropertyKey) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
