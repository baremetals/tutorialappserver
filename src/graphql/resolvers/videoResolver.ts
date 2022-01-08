import { deleteVideo, editVideo, getVideosByCourseId, newVideo } from "../../controllers/VideoController";
import { QueryArrayResult, QueryOneResult } from "../../controllers/QuerryArrayResult";
import { Video } from "../../entities/Video";
import { GqlContext } from "../GqlContext";
import { EntityResult, STANDARD_ERROR } from "../resolvers";


const NoteResolver = {
  VideoResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'Video';
    },
  },

  VideoArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return 'EntityResult';
      }
      return 'VideoArray';
    },
  },

  Query: {
    getVideosByCourseId: async (
      _obj: any,
      args: { courseId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ videos: Array<Video> } | EntityResult> => {
      let videos: QueryArrayResult<Video>;
      try {
        videos = await getVideosByCourseId(args.courseId);
        if (videos.entities) {
          return {
            videos: videos.entities,
          };
        }
        return {
          messages: videos.messages ? videos.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
  Mutation: {
    newVideo: async (
      _obj: any,
      args: {
        userId: string;
        courseId: string;
        title: string;
        description: string;
        url: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Video>;
      try {
        result = await newVideo(
          args.userId,
          args.courseId,
          args.title,
          args.description,
          args.url
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    editVideo: async (
      _obj: any,
      args: { id: string; description: string; title: string; url: string },
      ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return {
            messages: ['You must be logged in to make changes.'],
          };
        }

        const result = await editVideo(
          args.id,
          ctx.req.session!.userId,
          args.description,
          args.title,
          args.url
        );

        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    deleteVideo: async (
      _obj: any,
      args: { id: string },
      ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      try {
        if (!ctx.req.session || !ctx.req.session!.userId) {
          return 'You must be logged in to make this change.';
        }
        return await deleteVideo(args.id);

      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
};

export default NoteResolver;