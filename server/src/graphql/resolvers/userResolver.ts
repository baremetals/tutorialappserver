import {
  changePassword,
  login,
  logout,
  me,
  register,
  UserResult,
  activateUser,
  forgotPassword,
  resetPassword,
  editMe,
  deleteMe,
  searchUsers,
  editBackGroundImage,
  editProfileImage,
  getUserBySlugId
} from "../../controllers/UserController";
import { User } from "../../entities/User";
import { GqlContext, pubsub } from "../GqlContext";
import { STANDARD_ERROR, EntityResult } from "../resolvers";
import { ACCOUNT_ACTIVATED } from "../../lib/constants"
// import { PubSub } from "graphql-subscriptions";
import Redis from "ioredis";
import { Message } from "../../entities/Message";
import { QueryArrayResult } from '../../controllers/QuerryArrayResult';

// const pubsub = new PubSub();

const userResolver = {
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

  MsgResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Message';
    },
  },

  Subscription: {
    accountActivated: {
      subscribe: () => pubsub.asyncIterator(ACCOUNT_ACTIVATED),
    },
  },

  Query: {
    me: async (
      _obj: any,
      _args: null,
      ctx: GqlContext,
      _info: any
    ): Promise<User | EntityResult> => {
      let user: UserResult;
      // console.log(ctx.req.session.userId);
      try {
        if (!ctx.req.session?.userId) {
          console.log('Session not available');
          return {
            messages: ['User not logged in.'],
          };
        }
        // console.log("user")
        // const userId = "46"
        user = await me(ctx.req.session.userId);
        if (user && user.user) {
          // console.log(user.user)
          return user.user;
        }
        return {
          messages: user.messages ? user.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    getUserBySlugId: async (
      _obj: any,
      args: { userIdSlug: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<User | EntityResult> => {
      let user: UserResult;
      // console.log(ctx.req.session.userId);

      try {
        // if (!ctx.req.session?.userId) {
        //   console.log('Session not available');
        //   return {
        //     messages: ['User not logged in.'],
        //   };
        // }
        // console.log("user")
        // const userId = "46"
        user = await getUserBySlugId(args.userIdSlug);
        if (user && user.user) {
          return user.user;
        }
        return {
          messages: user.messages ? user.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

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
            // return (
            //   usr.username == args.searchItem ||
            //   usr.email == args.searchItem ||
            //   usr.fullName == args.searchItem
            // );
            // return Object.values(usr)
            //   .join(' ')
            //   .toLowerCase()
            //   .includes(args.searchItem.toLowerCase());

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
  },

  Mutation: {
    register: async (
      _obj: any,
      args: {
        email: string;
        username: string;
        fullName: string;
        password: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      let user: UserResult;
      try {
        user = await register(
          args.email,
          args.username,
          args.fullName,
          args.password
        );
        if (user && user.user) {
          return 'Registration successful.';
        }

        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        // console.log(ex)
        // if (ex.code === "23505" && ex.detail.includes("Email")) {
        //   return "This email is already registered";
        // } else {
        //   return "this username is already taken";
        // }
        throw ex;
      }
    },

    activateAccount: async (
      _obj: any,
      args: { token: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<Message | EntityResult> => {
      const redis = new Redis();
      try {
        const key = ACCOUNT_ACTIVATED + args.token;
        const userId = await redis.get(key);
        if (!userId) {
          return {
            messages: ['this token has expired'],
          };
        }

        let msg = await activateUser(userId);
        // pubsub.publish(ACCOUNT_ACTIVATED, { msg });

        if (msg && msg.msg) {
          // console.log(msg.msg);
          // pubsub.publish(ACCOUNT_ACTIVATED, { msg });
          return msg.msg;
        }
        pubsub.publish(ACCOUNT_ACTIVATED, { msg });
        await redis.del(key);

        return {
          messages: msg.messages ? msg.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },

    login: async (
      _obj: any,
      args: { usernameOrEmail: string; password: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      let user: UserResult;
      try {
        user = await login(args.usernameOrEmail, args.password);
        if (user && user.user) {
          ctx.req.session!.userId = user.user.id;
          //console.log(ctx.req.session);

          return `bm-user=${user.user.userIdSlug}-${user.user.id}`;
        }

        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },

    logout: async (
      _obj: any,
      args: { username: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        let result = await logout(args.username);
        ctx.req.session?.destroy((err: any) => {
          if (err) {
            console.log('destroy session failed');
            return;
          }
          console.log('session destroyed', ctx.req.session?.id);
        });
        ctx.res.clearCookie('maguyvathegreat');
        return result;
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },

    changePassword: async (
      _obj: any,
      args: { currentPassword: string; newPassword: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in before you can change your password.';
        }

        // const userId = "44"
        return await changePassword(
          ctx.req.session!.userId,
          // userId,
          args.currentPassword,
          args.newPassword
        );

        // return result;
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    forgotPassword: async (
      _obj: any,
      args: { usernameOrEmail: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        return await forgotPassword(args.usernameOrEmail);
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    resetPassword: async (
      _obj: any,
      args: { token: string; newPassword: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      const redis = new Redis();
      try {
        const key = 'RESET_PASSWORD' + args.token;
        const userId = await redis.get(key);
        if (!userId) {
          return 'this token has expired';
        }

        let result = await resetPassword(args.newPassword, userId);

        await redis.del(key);

        return result;
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    editMe: async (
      _obj: any,
      args: { email: string; username: string; fullName: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make changes.';
        }

        // const userId = "44"
        const result = await editMe(
          ctx.req.session!.userId,
          // userId,
          args.email,
          args.username,
          args.fullName
        );

        return result;
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    editProfileImage: async (
      _obj: any,
      args: { profileImage: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }

        // const userId = '46';
        const result = await editProfileImage(
          ctx.req.session!.userId,
          // userId,
          args.profileImage
        );

        return result;
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    editBackGroundImage: async (
      _obj: any,
      args: { backgroundImg: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make changes.';
        }

        // const userId = '46';
        const result = await editBackGroundImage(
          ctx.req.session!.userId,
          // userId,
          args.backgroundImg
        );

        return result;
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    deleteMe: async (
      _obj: any,
      _args: {},
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        // if (!ctx.req.session || !ctx.req.session!.userId) {
        //   return 'You must be logged in to make this change.';
        // }

        const userId = '51';
        // const result = await deleteMe(ctx.req.session!.userId);
        const result = await deleteMe(userId);

        return result;
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },

  // Notifications/emails
};

export default userResolver;
