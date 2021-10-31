import { getNotesByCourseId, newNote } from "../../controllers/NoteController";
import { QueryArrayResult, QueryOneResult } from "../../controllers/QuerryArrayResult";
import { Note } from "../../entities/Note";
import { GqlContext } from "../GqlContext";
import { EntityResult, STANDARD_ERROR } from "../resolvers";


const NoteResolver = {
  NoteResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Note";
    },
  },

  NoteArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "NoteArray";
    },
  },

  Query: {
    getNotesByCourseId: async (
      _obj: any,
      args: { courseId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ notes: Array<Note> } | EntityResult> => {
      let notes: QueryArrayResult<Note>;
      try {
        notes = await getNotesByCourseId(args.courseId);
        if (notes.entities) {
          return {
            notes: notes.entities,
          };
        }
        return {
          messages: notes.messages ? notes.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
  },
  Mutation: {
    newNote: async (
      _obj: any,
      args: {
        userId: string;
        courseId: string;
        title: string;
        body: string;
        noteType: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Note>;
      try {
        result = await newNote(args.userId, args.courseId, args.title, args.body, args.noteType);
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },

    // Todo

    // editNote: async (): Promise<string>{}
    // deleteNote: async (): Promise<string>{}
  },
};

export default NoteResolver;