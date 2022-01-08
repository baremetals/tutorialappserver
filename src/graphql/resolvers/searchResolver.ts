import {  
  QueryArrayResult, 
} from '../../controllers/QuerryArrayResult';
import {
  searchCoursesBySearchTerm,
  searchPostsBySearchTerm,
  searchUsersBySearchTerm,
} from '../../controllers/SearchController';
import { Course } from '../../entities/Course';
import { Post } from '../../entities/Post';
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

  SearchArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'SearchArray';
    },
  },

  Query: {
    searchUsersBySearchTerm: async (
      _obj: any,
      args: { searchItem: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ users: Array<User> } | EntityResult> => {
      let users: QueryArrayResult<User>;
      // let posts: QueryArrayResult<Post>;
      // let courses: QueryArrayResult<Course>;
      // const searchQuerry = [User, Post, Course];
      // let searchsArray: QueryArrayOfSearchResult<[User, Post, Course]>;
      // let searchArray: any = [];
      // let searches;

      try {
        users = await searchUsersBySearchTerm(args.searchItem);
        if (users.entities) {
          return {
            users: users.entities,
          };
        }

        return {
          messages: users.messages ? users.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    searchCoursesBySearchTerm: async (
      _obj: any,
      args: { searchItem: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ courses: Array<Course> } | EntityResult> => {
      let courses: QueryArrayResult<Course>;

      try {
        courses = await searchCoursesBySearchTerm(args.searchItem);
        if (courses.entities) {
          return {
            courses: courses.entities,
          };
        }

        return {
          messages: courses.messages ? courses.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    searchPostsBySearchTerm: async (
      _obj: any,
      args: { searchItem: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ posts: Array<Post> } | EntityResult> => {
      let posts: QueryArrayResult<Post>;

      try {
        posts = await searchPostsBySearchTerm(args.searchItem);
        if (posts.entities) {
          return {
            posts: posts.entities,
          };
        }

        return {
          messages: posts.messages ? posts.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    searchBySearchTerm: async (
      _obj: any,
      args: { searchItem: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<
      | { users: Array<User> }
      | { posts: Array<Post> }
      | { courses: Array<Course> }
      // | { searches: Array<[User, Post, Course]> }
      | EntityResult
    > => {
      let users: QueryArrayResult<User>;
      let posts: QueryArrayResult<Post>;
      let courses: QueryArrayResult<Course>;
      // let searches = [];

      try {
        users = await searchUsersBySearchTerm(args.searchItem);
        posts = await searchPostsBySearchTerm(args.searchItem);
        courses = await searchCoursesBySearchTerm(args.searchItem);

        if (users.entities && posts.entities && courses.entities) {
          // searches.push(users.entities, posts.entities, courses.entities);
          // console.log(searches);
          return {
            users: users.entities,
            posts: posts.entities,
            courses: courses.entities,
          };
        } else if (users.entities && posts.entities) {
          return {
            users: users.entities,
            posts: posts.entities,
          };
        } else if (users.entities && courses.entities) {
          return {
            users: users.entities,
            courses: courses.entities,
          };
        } else if (posts.entities && courses.entities) {
          return {
            posts: posts.entities,
            courses: courses.entities,
          };
        } else if (users.entities) {
          return {
            users: users.entities
          };
        } else if (posts.entities) {
          return {
            posts: posts.entities
          };
        } else if (courses.entities) {
          return {
            courses: courses.entities,
          };
        }

        return {
          messages: ["No resources found"] || [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },

  Mutation: {},

  // Notifications/emails
};

export default searchResolver;

