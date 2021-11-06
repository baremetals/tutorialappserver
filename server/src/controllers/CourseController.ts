import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Course } from "../entities/Course";
import { Student } from "../entities/Student";
import { User } from "../entities/User";
import { QueryArrayResult, QueryOneResult } from "./QuerryArrayResult";


export const createCourse = async (
  userId: string | undefined | null,
  categoryId: string,
  group: string,
  title: string,
  duration: string,
  description: string,
  image: string,
  startDate: string,
  endDate: string
): Promise<QueryArrayResult<Course>> => {
  const userRepository = getRepository(User);

  if (!userId) {
    return {
      messages: ["User not logged in."],
    };
  }

  const adminUser = await userRepository.findOne({
    id: userId,
  });

  if (group !== "Admin") {
      return {
        messages: ["User not permitted."],
      };
  } 

  const category = await Category.findOne({
    id: categoryId,
  });

  if (!category) {
    return {
      messages: ["category not found."],
    };
  }

  const course = await Course.create({
    title,
    duration,
    description,
    image,
    startDate,
    endDate,
    adminUser,
    category,
  }).save();

  console.log(course)

  if (!course) {
    return {
      messages: ["Failed to create course."],
    };
  }

  return {
    messages: ["Course created successfully."],
  };
};


export const getLatestCourses = async (): Promise<QueryArrayResult<Course>> => {
  const courses = await Course.createQueryBuilder("course")
    .leftJoinAndSelect("course.category", "category")
    .leftJoinAndSelect("course.adminUser", "adminUser")
    .leftJoinAndSelect("course.students", "students")
    .orderBy("course.createdOn", "DESC")
    .take(8)
    .getMany();

  if (!courses || courses.length === 0) {
    return {
      messages: ["No courses found."],
    };
  }
  // console.log(courses);
  return {
    entities: courses,
  };
};

export const getCoursesByCategoryId = async (
  categoryId: string
): Promise<QueryArrayResult<Course>> => {
  const courses = await Course.createQueryBuilder("course")
    .where(`course."categoryId" = :categoryId`, { categoryId })
    .leftJoinAndSelect("course.category", "category")
    .orderBy("course.createdOn", "DESC")
    .getMany();

  if (!courses || courses.length === 0) {
    return {
      messages: ["courses of category not found."],
    };
  }
  console.log(courses);
  return {
    entities: courses,
  };
};

export const getStudentsByCourseId = async (
  courseId: string
): Promise<QueryArrayResult<Student>> => {
  const students = await Student.createQueryBuilder("cs")
    .where(`cs."courseId" = :courseId`, { courseId })
    .leftJoinAndSelect("cs.course", "course")
    .leftJoinAndSelect("cs.user", "courses")
    .orderBy("cs.createdOn", "DESC")
    .getMany();

  if (!students) {
    return {
      messages: ["Students were not found."],
    };
  }
  // console.log(students);
  return {
    entities: students,
  };
};

export const getCourseById = async (
  id: string
): Promise<QueryOneResult<Course>> => {
  const course = await Course.findOne({ id });
  if (!course) {
    return {
      messages: ["Course not found."],
    };
  }

  return {
    entity: course,
  };
};

// Todo

// export const editCourse = async (): Promise{}
// export const deleteCourse = async (): Promise{}
// export const removeStudent = async (): Promise{}

