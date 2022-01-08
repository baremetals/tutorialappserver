import { getConnection, getRepository } from "typeorm";
import { QueryArrayResult } from "./QuerryArrayResult";
import { isPostBodyValid, isPostTitleValid } from "../utils/validators/PostValidators";
import { Course } from "../entities/Course";
import { Video } from "../entities/Video";
import { User } from "../entities/User";


export const newVideo = async (
  userId: string | undefined | null,
  courseId: string,
  title: string,
  description: string,
  url: string
): Promise<QueryArrayResult<Video>> => {
  const userRepository = getRepository(User);
  const titleMsg = isPostTitleValid(title);
  if (titleMsg) {
    return {
      messages: [titleMsg],
    };
  }
  const bodyMsg = isPostBodyValid(description);
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

  const video = await Video.create({
    title,
    url,
    description,
    teacher,
    course,
    createdBy: teacher?.fullName,
    lastModifiedBy: teacher?.fullName,
  }).save();

  if (!video) {
    return {
      messages: ["Failed to add video."],
    };
  }

  return {
    messages: ["Video added successfully."],
  };
};

export const editVideo = async (
  id: string,
  userId: string,
  description: string,
  title: string,
  url: string
): Promise<QueryArrayResult<Video>> => {
  const titleMsg = isPostTitleValid(title);
  if (titleMsg) {
    return {
      messages: [titleMsg],
    };
  }
  const bodyMsg = isPostBodyValid(description);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }
  const video = await Video.findOne({
    where: { id },
  });

  if (!video) {
    return {
      messages: ['Video not found.'],
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
    .update(Video)
    .set({
      description,
      title,
      url,
      lastModifiedBy: teacher.fullName,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  return {
    messages: ['Video edited successfully.'],
  };
};

export const deleteVideo = async (id: string): Promise<string> => {
  const video = await Video.findOne({
    where: { id },
  });

  if (!video) {
    return 'Note not found.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Video)
    .where('id = :id', { id: id })
    .execute();
  return 'Your video has been deleted.';
};

export const deleteAllVideosByCourseId = async (id: string): Promise<string> => {
  const video = await Video.find({
    where: { id },
  });

  if (!video) {
    return 'Video not found.';
  }

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Video)
    .where('courseId = :courseId', { courseId: id })
    .execute();
  return 'Your videos have been deleted.';
};

// Queries
export const getVideosByCourseId = async (
  courseId: string
): Promise<QueryArrayResult<Video>> => {
  const videos = await Video.createQueryBuilder("vid")
    .where(`vid."courseId" = :courseId`, { courseId })
    .leftJoinAndSelect("vid.course", "course")
    .orderBy("vid.createdOn", "DESC")
    .getMany();

  if (!videos || videos.length === 0) {
    return {
      messages: ['No course videos found.'],
    };
  }
  // console.log(videos);
  return {
    entities: videos,
  };
};


