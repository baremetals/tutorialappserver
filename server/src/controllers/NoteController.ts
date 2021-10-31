import { getRepository } from "typeorm";
import { QueryArrayResult } from "./QuerryArrayResult";
import { isPostBodyValid, isPostTitleValid } from "../utils/validators/PostValidators";
import { Course } from "../entities/Course";
import { Note } from "../entities/Note";
import { User } from "../entities/User";


export const newNote = async (
  userId: string | undefined | null,
  courseId: string,
  title: string,
  body: string,
  noteType: string
): Promise<QueryArrayResult<Note>> => {
  const userRepository = getRepository(User);
  const titleMsg = isPostTitleValid(title);
  if (titleMsg) {
    return {
      messages: [titleMsg],
    };
  }
  const bodyMsg = isPostBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }

  if (!userId) {
    return {
      messages: ["User not logged in."],
    };
  }

  const adminUser = await userRepository.findOne({
    id: userId,
  });

  const course = await Course.findOne({
    id: courseId,
  });
  if (!course) {
    return {
      messages: ["Course not found."],
    };
  }

  const note = await Note.create({
    title,
    body,
    adminUser,
    noteType,
    course,
  }).save();

  if (!note) {
    return {
      messages: ["Failed to create note."],
    };
  }

  return {
    messages: ["Note created successfully."],
  };
};


export const getNotesByCourseId = async (
  courseId: string
): Promise<QueryArrayResult<Note>> => {
  const notes = await Note.createQueryBuilder("note")
    .where(`note."courseId" = :courseId`, { courseId })
    .leftJoinAndSelect("note.course", "course")
    .orderBy("note.createdOn", "DESC")
    .getMany();

  if (!notes || notes.length === 0) {
    return {
      messages: ["Notes of course not found."],
    };
  }
  console.log(notes);
  return {
    entities: notes,
  };
};

// Todo List

// export const deleteAllNotes = async (): Promise{}
// export const deleteNote = async (): Promise{}
// export const editNote = async (): Promise{}