import {
  QueryArrayResult,
  QueryOneResult,
} from "../../controllers/QuerryArrayResult";
import { GqlContext } from "../GqlContext";
import {
} from "../../controllers/PostController";
import { STANDARD_ERROR, EntityResult } from "../resolvers";
import { createCourse, getCourseById, getCoursesByCategoryId, getLatestCourses, getStudentsByCourseId } from "../../controllers/CourseController";
import { Course } from "../../entities/Course";
import { joinOrLeaveCourse } from "../../controllers/StudentController";
import { Student } from "../../entities/Student";

const courseResolver = {
  CourseResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "Course";
    },
  },
  CourseArrayResult: {
    __resolveType(obj: any, _context: GqlContext, _info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "CourseArray";
    },
  },

  Query: {
    getCourseById: async (
      _obj: any,
      args: { id: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<Course | EntityResult> => {
      let course: QueryOneResult<Course>;
      try {
        course = await getCourseById(args.id);

        if (course.entity) {
          return course.entity;
        }
        return {
          messages: course.messages ? course.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex.message);
        throw ex;
      }
    },

    getLatestCourses: async (
      _obj: any,
      _args: null,
      _ctx: GqlContext,
      _info: any
    ): Promise<{ courses: Array<Course> } | EntityResult> => {
      let courses: QueryArrayResult<Course>;
      try {
        courses = await getLatestCourses();
        if (courses.entities) {
          return {
            courses: courses.entities,
          };
        }
        return {
          messages: courses.messages ? courses.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getCoursesByCategoryId: async (
      _obj: any,
      args: { categoryId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ courses: Array<Course> } | EntityResult> => {
      let courses: QueryArrayResult<Course>;
      try {
        courses = await getCoursesByCategoryId(args.categoryId);
        if (courses.entities) {
          return {
            courses: courses.entities,
          };
        }
        return {
          messages: courses.messages ? courses.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    getStudentsByCourseId: async (
      _obj: any,
      args: { courseId: string },
      _ctx: GqlContext,
      _info: any
    ): Promise<{ students: Array<Student> } | EntityResult> => {
      let students: QueryArrayResult<Student>;
      try {
        students = await getStudentsByCourseId(args.courseId);
        if (students.entities) {
          return {
            students: students.entities,
          };
        }
        return {
          messages: students.messages ? students.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },
  },
  Mutation: {
    createCourse: async (
      _obj: any,
      args: {
        userId: string;
        categoryId: string;
        group: string;
        title: string;
        duration: string;
        description: string;
        image: string;
        startDate: string;
        endDate: string;
      },
      _ctx: GqlContext,
      _info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Course>;
      try {
        result = await createCourse(
          args.userId,
          args.categoryId,
          args.group,
          args.title,
          args.duration,
          args.description,
          args.image,
          args.startDate,
          args.endDate
        );
        return {
          messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
      } catch (ex) {
        console.log(ex);
        throw ex;
      }
    },
    joinOrLeaveCourse: async (
      _obj: any,
      args: { courseId: string; join: boolean },
      _ctx: GqlContext,
      _info: any
    ): Promise<string> => {
      let result = "";
      const userId = "44";
      try {
        // if (!ctx.req.session || !ctx.req.session?.userId) {
        //   return "You must be logged in to join this course.";
        // }
        result = await joinOrLeaveCourse(
          // ctx.req.session!.userId,
          userId,
          args.courseId,
          args.join
        );
        return result;
      } catch (ex) {
        console.error(ex);
        throw ex;
      }
    },

    // Todo

    // editCourse: async (): Promise<>{}
    // deleteCourse: async (): Promise<>{}
    // removeStudent: async (): Promise<>{}
  },
};

export default courseResolver;
