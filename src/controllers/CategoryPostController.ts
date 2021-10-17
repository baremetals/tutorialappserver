import CategoryPost from "../entities/CategoryPost";
import { Post } from "../entities/Post";
import { PostCategory } from "../entities/Category";

export const getTopCategoryPost = async (): Promise<
  Array<CategoryPost>
> => {
  const categories = await PostCategory.createQueryBuilder("postCategory")
    .leftJoinAndSelect("postCategory.posts", "post")
    .getMany();

  const categoryPosts: Array<CategoryPost> = [];
  // sort categories with most posts on top then desc
  categories.sort((a: PostCategory, b: PostCategory) => {
    if (a.posts.length > b.posts.length) return -1;
    if (a.posts.length < b.posts.length) return 1;
    return 0;
  });
  const topCats = categories.slice(0, 3);
  // sort the posts by createdOn desc
  topCats.forEach((cat) => {
    cat.posts.sort((a: Post, b: Post) => {
      if (a.createdOn > b.createdOn) return -1;
      if (a.createdOn < b.createdOn) return 1;
      return 0;
    });
    cat.posts.forEach((po) => {
      categoryPosts.push(
        new CategoryPost(po.id, cat.id, cat.name, po.title, po.createdOn)
      );
    });
  });

  return categoryPosts;
};
