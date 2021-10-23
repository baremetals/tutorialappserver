import { PostCategory } from "../entities/EntityCategory";
import { Post } from "../entities/Post";
import { Category } from "../entities/Category";

export const getTopCategoryPost = async (): Promise<Array<PostCategory>> => {
  const categories = await Category.createQueryBuilder("category")
    .leftJoinAndSelect("category.posts", "post")
    .getMany();

  const categoryPosts: Array<PostCategory> = [];
  // sort categories with most posts on top then desc
  categories.sort((a: Category, b: Category) => {
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
        new PostCategory(po.id, cat.id, cat.name, po.title, po.createdOn)
      );
    });
  });

  return categoryPosts;
};
