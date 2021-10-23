import { QueryArrayResult } from "./QuerryArrayResult";
import { Category } from "../entities/Category";

export const getAllCategories = async (): Promise<
  QueryArrayResult<Category>
> => {
  const categories = await Category.find();

  return {
    entities: categories,
  };
};
