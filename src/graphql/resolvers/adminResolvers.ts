import { createSupportMessage } from '../../controllers/AdminController';
import {
  QueryOneResult,
} from '../../controllers/QuerryArrayResult';
import { Support } from '../../entities/SharedEntity';
import { GqlContext } from '../GqlContext';
import { EntityResult, STANDARD_ERROR } from '../resolvers';

const adminResolver = {
  SupportResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Support';
    },
  },
  SupportArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'SupportArray';
    },
  },

  Mutation: {
    createSupportMessage: async (
      _obj: any,
      args: {
        fullName: string;
        email: string;
        subject: string;
        body: string;
        username?: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Support>;
      try {
        result = await createSupportMessage(
          args.fullName, 
          args.email, 
          args.subject, 
          args.body,
          args.username
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
};
export default adminResolver;