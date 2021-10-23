// import Category from "./Category";
import Comment from "./Comment";
import User from "./User";

export default class Post {
  constructor(
    public id: string,
    public views: number,
    public title: string,
    public body: string,
    public user: User,
    public points: number,
    public createdOn: Date,
    public lastModifiedOn: Date,
    public threadItems: Array<Comment>,
    // public category: Category
  ) {}
}
