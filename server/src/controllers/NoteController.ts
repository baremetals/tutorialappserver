import { getConnection, getRepository } from "typeorm";
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

  const teacher = await userRepository.findOne({
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
    teacher,
    noteType,
    course,
    createdBy: teacher?.username,
    lastModifiedBy: teacher?.username,
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

export const editNote = async (
  id: string,
  userId: string,
  body: string,
  title: string
): Promise<QueryArrayResult<Note>> => {
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
  const note = await Note.findOne({
    where: { id },
  });

  if (!note) {
    return {
      messages: ['Note not found.'],
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
    .update(Note)
    .set({
      body,
      title,
      lastModifiedBy: teacher.username,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  return {
    messages: ['Note edited successfully.'],
  };
};

export const deleteNote = async (id: string): Promise<string> => {
  const note = await Note.findOne({
    where: { id },
  });

  if (!note) {
    return 'Note not found.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('id = :id', { id: id })
    .execute();
  return 'Your note has been deleted.';
};

export const deleteAllNotesByCourseId = async (id: string): Promise<string> => {
  const note = await Note.find({
    where: { id },
  });

  if (!note) {
    return 'Note not found.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Note)
    .where('courseId = :courseId', { courseId: id })
    .execute();
  return 'Your notes has been deleted.';
};

// Queries
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


