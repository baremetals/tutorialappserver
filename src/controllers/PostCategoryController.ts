import { QueryArrayResult } from "./QuerryArrayResult";
import { PostCategory } from "../entities/Category";

export const getAllCategories = async (): Promise<
  QueryArrayResult<PostCategory>
> => {
  const categories = await PostCategory.find();

  return {
    entities: categories,
  };
};
