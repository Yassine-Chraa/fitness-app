// import { API_URL } from '@env';

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
  Posts: '/api/posts',
  Images: '/api/images',
  Comments: '/api/comments',
  Replies: '/api/replies',
  Reactions: '/api/reactions',
  PostsByUserId: '/api/postsByUserId',
  CommentsByPostId: '/api/commentsByPostId',
  ReplysByCommentId: '/api/repliesByCommentId',
  DeleteReactionByPostUserId: '/api/deleteReactionByPostUserId',
  GetReactionByPostUserId: '/api/getReactionByPostUserId',
  UploadUrl: '/api/upload',
  CsrfToken: '/csrf-token',
};

export function getUrl(endpoint: PropertyKey) {
  return "http://192.168.59.196:8080" + endpoints[endpoint];
}

export default endpoints;
