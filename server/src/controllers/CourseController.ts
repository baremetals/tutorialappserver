import { getConnection, getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Course } from "../entities/Course";
import { Note } from '../entities/Note';
import { Student } from "../entities/Student";
import { User } from "../entities/User";
import { QueryArrayResult, QueryOneResult } from "./QuerryArrayResult";
import { v4 } from 'uuid';


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

  const teacher = await userRepository.findOne({
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
  const generatedToken = v4();
  const slug = generatedToken + '-' + title;

  const course = await Course.create({
    slug,
    title,
    duration,
    description,
    image,
    startDate,
    endDate,
    teacher,
    category,
    createdBy: teacher?.username,
    lastModifiedBy: teacher?.username,
  }).save();

  // console.log(course)

  if (!course) {
    return {
      messages: ["Failed to create course."],
    };
  }

  return {
    messages: [`${course.slug}`],
  };
};

export const editCourse = async (
  id: string,
  userId: string,
  title: string,
  duration: string,
  description: string,
  image: string,
  startDate: string,
  endDate: string,
  categoryId: string
): Promise<QueryArrayResult<Course>> => {
  const course = await Course.findOne({
    where: { id },
  });

  if (!course) {
    return {
      messages: ['Course not found.'],
    };
  }

  const category = await Category.findOne({
    where: { categoryId },
  });

  if (!category) {
    return {
      messages: ['Category not found.'],
    };
  }

  const teacher = await User.findOne({
    where: { id: userId },
  });

  if (!teacher) {
    return {
      messages: ['Teacher not found.'],
    };
  }

  await getConnection()
    .createQueryBuilder()
    .update(Course)
    .set({
      title,
      duration,
      description,
      image,
      startDate,
      endDate,
      category,
      lastModifiedBy: teacher?.username,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  return {
    messages: ['Course edited successfully.'],
  };
};

export const deleteCourse = async (id: string): Promise<string> => {
  const course = await Course.findOne({
    where: { id },
  });

  if (!course) {
    return 'Course not found.';
  }

  const notes = await Note.find({
    where: { id },
  });

  if (!notes) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Course)
      .where('id = :id', { id: id })
      .execute();
    return 'Your course has been deleted.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('courseId = :courseId', { courseId: id })
    .execute();

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Course)
    .where('id = :id', { id: id })
    .execute();
  return 'Your course has been deleted.';
};

// Queries
export const getLatestCourses = async (): Promise<QueryArrayResult<Course>> => {
  const courses = await Course.createQueryBuilder('course')
    .leftJoinAndSelect('course.category', 'category')
    .leftJoinAndSelect('course.teacher', 'teacher')
    .leftJoinAndSelect('course.students', 'students')
    .leftJoinAndSelect('course.notes', 'notes')
    .orderBy('course.createdOn', 'DESC')
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
  const course = await Course.findOne({
    where: {
      id,
    },
    relations: [
      'teacher',
      'notes',
      'notes.teacher',
      'notes.course',
      'category',
      'students',
      'students.user',
    ],
  });
  if (!course) {
    return {
      messages: ['Course not found.'],
    };
  }

  if (course.notes) {
    course.notes.sort((a: Note, b: Note) => {
      if (a.createdOn > b.createdOn) return -1;
      if (a.createdOn < b.createdOn) return 1;
      return 0;
    });
  }

  return {
    entity: course,
  };
};



