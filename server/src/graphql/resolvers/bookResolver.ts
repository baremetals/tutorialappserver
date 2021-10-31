import {
  QueryArrayResult,
  QueryOneResult,
} from "../../controllers/QuerryArrayResult";
import { GqlContext } from "../GqlContext";
import {} from "../../controllers/PostController";
import { STANDARD_ERROR, EntityResult } from "../resolvers";
import { addABook, getBooks, getBooksByCategoryId } from "../../controllers/BookController";
import { Book } from "../../entities/Book";

const bookResolver = {
  BookResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Book";
    },
  },
  BookArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "BookArray";
    },
  },

  Query: {
    getBooks: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ books: Array<Book> } | EntityResult> => {
      let books: QueryArrayResult<Book>;
      try {
        books = await getBooks();
        if (books.entities) {
          return {
            books: books.entities,
          };
        }
        return {
          messages: books.messages ? books.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getBooksByCategoryId: async (
      _obj: any,
      args: { categoryId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ books: Array<Book> } | EntityResult> => {
      let books: QueryArrayResult<Book>;
      try {
        books = await getBooksByCategoryId(args.categoryId);
        if (books.entities) {
          return {
            books: books.entities,
          };
        }
        return {
          messages: books.messages ? books.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },
  Mutation: {
    addABook: async (
      _obj: any,
      args: {
        userId: string;
        categoryId: string;
        title: string;
        description: string;
        image: string;
        link: string;
        author: string;
        group: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Book>;
      try {
        result = await addABook(
          args.userId,
          args.categoryId,
          args.group,
          args.title,
          args.description,
          args.image,
          args.author,
          args.link
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    // Todo

    // editBook: async (): Promise<string>{}
    // deleteBook: async (): Promise<string>{}
  },
};

export default bookResolver;
