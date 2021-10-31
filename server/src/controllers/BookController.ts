import { getRepository } from "typeorm";
import { Book } from "../entities/Book";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { QueryArrayResult } from "./QuerryArrayResult";



export const addABook = async (
  userId: string | undefined | null,
  categoryId: string,
  group: string,
  title: string,
  description: string,
  image: string,
  author: string,
  link: string
): Promise<QueryArrayResult<Book>> => {
  const userRepository = getRepository(User);

  if (!userId) {
    return {
      messages: ["User not logged in."],
    };
  }

  const adminUser = await userRepository.findOne({
    id: userId,
  });

  if (group !== "Admin") {
    console.log(group)
    return {
      messages: ["User not permitted."],
    };
  }

  const category = await Category.findOne({
    id: categoryId,
  });

  if (!category) {
    return {
      messages: ["category not found."],
    };
  }

  const book = await Book.create({
    title,
    author,
    description,
    image,
    adminUser,
    link,
    category,
  }).save();

  if (!book) {
    return {
      messages: ["Failed to create book."],
    };
  }

  return {
    messages: ["Book created successfully."],
  };
};

export const getBooks = async (): Promise<QueryArrayResult<Book>> => {
  const books = await Book.createQueryBuilder("book")
    .leftJoinAndSelect("book.category", "category")
    .leftJoinAndSelect("book.adminUser", "adminUser")
    .orderBy("book.createdOn", "DESC")
    .take(12)
    .getMany();

  if (!books || books.length === 0) {
    return {
      messages: ["No books found."],
    };
  }
  // console.log(books);
  return {
    entities: books,
  };
};

export const getBooksByCategoryId = async (
  categoryId: string
): Promise<QueryArrayResult<Book>> => {
  const books = await Book.createQueryBuilder("book")
    .where(`book."categoryId" = :categoryId`, { categoryId })
    .leftJoinAndSelect("book.category", "category")
    .orderBy("book.createdOn", "DESC")
    .getMany();

  if (!books || books.length === 0) {
    return {
      messages: ["books of category not found."],
    };
  }
  // console.log(books);
  return {
    entities: books,
  };
};

// Todo

// export const editBook = async (): Promise{}
// export const deleteBook = async (): Promise{}

