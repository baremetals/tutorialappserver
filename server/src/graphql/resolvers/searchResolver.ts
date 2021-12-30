import { QueryArrayResult } from '../../controllers/QuerryArrayResult';
import { fullTextSearchApi, searchUsers } from '../../controllers/SearchController';
import { Search } from '../../entities/Search';
import { User } from '../../entities/User';
import { GqlContext } from '../GqlContext';
import { EntityResult, STANDARD_ERROR } from '../resolvers';



const searchResolver = {
  UserResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'User';
    },
  },

  UserArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'UserArray';
    },
  },

  PostResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Post';
    },
  },

  PostArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'PostArray';
    },
  },

  CourseResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Course';
    },
  },
  CourseArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'CourseArray';
    },
  },

  Query: {
    searchUsers: async (
      _obj: any,
      args: { searchItem: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ users: Array<User> } | EntityResult> => {
      let users: QueryArrayResult<User>;

      try {
        users = await searchUsers();
        if (users.entities) {
          const allUsers = users.entities.filter((usr) => {
            return (
              usr.username
                .toLowerCase()
                .includes(args.searchItem.toLowerCase()) ||
              usr.email.toLowerCase().includes(args.searchItem.toLowerCase()) ||
              usr.fullName.toLowerCase().includes(args.searchItem.toLowerCase())
            );
          });

          return {
            users: allUsers,
          };
        }
        return {
          messages: users.messages ? users.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    fullTextSearchApi: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ searches: Array<Search> } | EntityResult> => {
      let searches: QueryArrayResult<Search>;
      try {
        searches = await fullTextSearchApi();
        if (searches.entities) {
          return {
            searches: searches.entities,
          };
        }
        return {
          messages: searches.messages ? searches.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },

  Mutation: {},

  // Notifications/emails
};

export default searchResolver;