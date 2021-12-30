import { Course } from '../entities/Course';
import { Search } from '../entities/Search';
import { User } from '../entities/User';
import { QueryArrayResult } from './QuerryArrayResult';


export const searchUsers = async (): Promise<QueryArrayResult<User>> => {
  const users = await User.createQueryBuilder('user')
    .orderBy('user.createdOn', 'DESC')
    .take(10)
    .getMany();

  if (!users || users.length === 0) {
    return {
      messages: ['No users found.'],
    };
  }

  return {
    entities: users,
  };
};

export const searchCourses = async (): Promise<QueryArrayResult<Course>> => {
  const courses = await Course.createQueryBuilder('course')
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

export const fullTextSearchApi = async (): Promise<QueryArrayResult<Search>> => {
  const searches = await Search.createQueryBuilder('search')
    .leftJoinAndSelect('search.users', 'users')
    .leftJoinAndSelect('search.posts', 'posts')
    .leftJoinAndSelect('search.courses', 'courses')
    .orderBy('search.createdOn', 'DESC')
    .take(8)
    .getMany();

  if (!searches || searches.length === 0) {
    return {
      messages: ['Nothing found.'],
    };
  }
  // console.log(searches);
  return {
    entities: searches,
  };
};