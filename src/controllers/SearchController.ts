import { Course } from '../entities/Course';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { QueryArrayResult } from './QuerryArrayResult';


export const searchUsersBySearchTerm = async (
  searchTerm: string
): Promise<QueryArrayResult<User>> => {
  const users = await User.createQueryBuilder('user')
    .where('user.UserName ilike :username OR user.FullName ilike :fullName', {
      username: `%${searchTerm}%`,
      fullName: `%${searchTerm}%`,
    })
    // .where('user.FullName ilike :fullName', { fullName: `%${searchTerm}%` })
    .orderBy('user.createdOn', 'DESC')
    .take(10)
    .getMany();

  if (!users || users.length === 0) {
    return {
      messages: ['No users found.'],
    };
  }

  // console.log(users);

  return {
    entities: users,
  };
};

export const searchCoursesBySearchTerm = async (
  searchTerm: string
): Promise<QueryArrayResult<Course>> => {
  const courses = await Course.createQueryBuilder('course')
    .where(
      'course.Title ilike :title OR course.Description ilike :description',
      {
        title: `%${searchTerm}%`,
        description: `%${searchTerm}%`,
      }
    )
    // .andWhere('course.Description ilike :description', {
    //   description: `%${searchTerm}%`,
    // })
    .orderBy('course.createdOn', 'DESC')
    .take(10)
    .getMany();

  if (!courses || courses.length === 0) {
    return {
      messages: ['No courses found.'],
    };
  }

  return {
    entities: courses,
  };
};


export const searchPostsBySearchTerm = async (
  searchTerm: string
): Promise<QueryArrayResult<Post>> => {
  const posts = await Post.createQueryBuilder('post')
    .where('post.Title ilike :title OR post.Body ilike :body', {
      title: `%${searchTerm}%`,
      body: `%${searchTerm}%`,
    })
    // .andWhere('post.Body ilike :body', { body: `%${searchTerm}%` })
    .orderBy('post.createdOn', 'DESC')
    .getMany();

  if (!posts || posts.length === 0) {
    return {
      messages: ['Posts not found.'],
    };
  }
  // console.log(posts);
  return {
    entities: posts,
  };
};