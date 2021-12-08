import { getManager } from "typeorm";
import { User } from "../entities/User";
import { Student } from "../entities/Student";
import { Course } from "../entities/Course";

export const joinOrLeaveCourse = async (
  userId: string,
  courseId: string,
  join: boolean
): Promise<string> => {
  if (!userId || userId === "0") {
    return "User is not authenticated";
  }

  let message = "Failed to join course";
  const course = await Course.findOne({
    where: { id: courseId },
    relations: ["teacher"],
  });

  if (course!.teacher!.id === userId) {
    message = "Error: Teachers cannot join their own course";
    console.log("incCourseStudent", message);
    return message;
  }
  const user = await User.findOne({ where: { id: userId } });

  const existingStudent = await Student.findOne({
    where: {
      course: { id: courseId },
      user: { id: userId },
    },
    relations: ["course"],
  });
  await getManager().transaction(async (_transactionEntityManager) => {
    if (existingStudent) {
      if (join) {
        if (existingStudent.hasJoined) {
          console.log('remove dec');
          await Student.remove(existingStudent);
          course!.totalStudents = Number(course!.totalStudents) + 1;
          course!.lastModifiedOn = new Date();
          await course!.save();
          console.log('I was here')
        }
      } else {
        if (!existingStudent.hasJoined) {
          console.log('remove inc');
          await Student.remove(existingStudent);
          course!.totalStudents = Number(course!.totalStudents) - 1;
          course!.lastModifiedOn = new Date();
          await course!.save();
          console.log('actually I was here');
        }
      }
    } else {
      console.log('new student');
      await Student.create({
        course,
        hasJoined: join,
        user,
      }).save();
      console.log('new student has joined the course');

      if (join) {
        course!.totalStudents = Number(course!.totalStudents) + 1;
        console.log(course!.totalStudents);
      } else {
        course!.totalStudents = Number(course!.totalStudents) - 1;
      }
      course!.lastModifiedOn = new Date();
      await course!.save();
    }
    console.log(course!.totalStudents);
    message = `You have successfully ${
      join ? "joined" : "left"
    } the course ${course!.title}.`;
  });

  return message;
};

// Todo
// export const removeStudent = async (): Promise{}