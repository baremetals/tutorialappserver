import {
  changePassword,
  login,
  logout,
  me,
  register,
  UserResult,
} from "../../controllers/UserController";
import { User } from "../../entities/User";
import { GqlContext } from "../GqlContext";
import { STANDARD_ERROR, EntityResult } from "../resolvers";

const userResolver = {
  UserResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "User";
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
      try {
        if (!ctx.req.session?.userId) {
          console.log("Session not available");
          return {
            messages: ["User not logged in."],
          };
        }
        user = await me(ctx.req.session.userId);
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
          return "Registration successful.";
        }

        return user && user.messages ? user.messages[0] : STANDARD_ERROR;
      } catch (ex) {
        if (ex.code === "23505" && ex.detail.includes("Email")) {
          return "This email is already registered";
        } else {
          return "this username is already taken";
        }
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

          return `Login successful for username ${user.user.username}.`;
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
            console.log("destroy session failed");
            return;
          }
          console.log("session destroyed", ctx.req.session?.id);
        });
        return result;
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },
    changePassword: async (
      _obj: any,
      args: { newPassword: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return "You must be logged in before you can change your password.";
        }
        return await changePassword(ctx.req.session!.userId, args.newPassword);

        // return result;
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },
};

export default userResolver;
