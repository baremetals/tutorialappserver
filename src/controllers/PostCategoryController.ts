import { QueryArrayResult } from "./QuerryArrayResult";
import { PostCategory } from "../entities/PostCategory";

export const getAllCategories = async (): Promise<
  QueryArrayResult<PostCategory>
> => {
  const categories = await PostCategory.find();

  return {
    entities: categories,
  };
};
