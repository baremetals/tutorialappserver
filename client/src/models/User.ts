import Post from "./Post";
import Comment from "./Comment";

export default class User {
  constructor(
    public id: string,
    public email: string,
    public userName: string,
    public fullName: string,
    public posts?: Array<Post>,
    public comments?: Array<Comment>
  ) {}
}

export interface AuthState {
  user: User| null;
  authenticated: boolean;
  loading: boolean;
}