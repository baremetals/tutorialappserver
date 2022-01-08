import { GqlContext } from '../GqlContext';
import { addUserToAGroup } from '../../controllers/GroupController';

const groupResolver = {
  GroupResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Group';
    },
  },
  GroupArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'GroupArray';
    },
  },

  Query: {
    // getBooks: async (
    //   _obj: any,
    //   _args: null,
    //   _ctx: GqlContext,
    //   _info: any
    // ): Promise<{ books: Array<Book> } | EntityResult> => {
    //   let books: QueryArrayResult<Book>;
    //   try {
    //     books = await getBooks();
    //     if (books.entities) {
    //       return {
    //         books: books.entities,
    //       };
    //     }
    //     return {
    //       messages: books.messages ? books.messages : [STANDARD_ERROR],
    //     };
    //   } catch (ex) {
    //     console.error(ex);
    //     throw ex;
    //   }
    // },

    // getBooksByCategoryId: async (
    //   _obj: any,
    //   args: { categoryId: string },
    //   _ctx: GqlContext,
    //   _info: any
    // ): Promise<{ books: Array<Book> } | EntityResult> => {
    //   let books: QueryArrayResult<Book>;
    //   try {
    //     books = await getBooksByCategoryId(args.categoryId);
    //     if (books.entities) {
    //       return {
    //         books: books.entities,
    //       };
    //     }
    //     return {
    //       messages: books.messages ? books.messages : [STANDARD_ERROR],
    //     };
    //   } catch (ex) {
    //     console.error(ex);
    //     throw ex;
    //   }
    // },
  },
  Mutation: {
    addUserToAGroup: async (
      _obj: any,
      args: {
        id: string;
        userId: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {

      try {
        return await addUserToAGroup(args.userId, args.userId);

      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
};

export default groupResolver;
