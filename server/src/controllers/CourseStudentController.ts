import { getManager, getRepository } from "typeorm";
import { User } from "../entities/User";
import { CourseStudent } from "../entities/CourseStudent";
import { Course } from "../entities/Course";

export const joinOrLeaveCourse = async (
  userId: string,
  courseId: string,
  join: boolean
): Promise<string> => {
  const userRepository = getRepository(User);
  if (!userId || userId === "0") {
    return "User is not authenticated";
  }

  let message = "Failed to join course";
  const course = await Course.findOne({
    where: { id: courseId },
    relations: ["adminUser"],
  });

  if (course!.adminUser!.id === userId) {
    message = "Error: Teachers cannot join their own course";
    console.log("incCourseStudent", message);
    return message;
  }
  const student = await userRepository.findOne({ where: { id: userId } });

  const existingUser = await CourseStudent.findOne({
    where: {
      course: { id: courseId },
      student: { id: userId },
    },
    relations: ["course"],
  });
  await getManager().transaction(async (_transactionEntityManager) => {
    if (existingUser) {
      if (join) {
        if (existingUser.hasJoined) {
          console.log("remove dec");
          await CourseStudent.remove(existingUser);
          course!.students = Number(course!.students) + 1;
          course!.lastModifiedOn = new Date();
          await course!.save();
        }
      } else {
        if (!existingUser.hasJoined) {
          console.log("remove inc");
          await CourseStudent.remove(existingUser);
          course!.students = Number(course!.students) - 1;
          course!.lastModifiedOn = new Date();
          await course!.save();
        }
      }
    } else {
      console.log("new student has joined the course");
      await CourseStudent.create({
        course,
        hasJoined: !join,
        student,
      }).save();
      if (join) {
        course!.students = Number(course!.students) + 1;
      } else {
        course!.students = Number(course!.students) - 1;
      }
      course!.lastModifiedOn = new Date();
      await course!.save();
    }
    console.log(course!.title);
    message = `You have successfully ${
      join ? "joined" : "left"
    } the course ${course!.title}.`;
  });

  return message;
};
