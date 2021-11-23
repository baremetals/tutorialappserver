import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Book = {
  __typename?: 'Book';
  adminUser: User;
  author: Scalars['String'];
  category: Category;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  link: Scalars['String'];
  title: Scalars['String'];
};

export type BookArray = {
  __typename?: 'BookArray';
  books?: Maybe<Array<Book>>;
};

export type BookArrayResult = BookArray | EntityResult;

export type BookResult = Book | EntityResult;

export type Category = {
  __typename?: 'Category';
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  name: Scalars['String'];
  posts: Array<Post>;
};

export type CategoryPost = {
  __typename?: 'CategoryPost';
  categoryId: Scalars['ID'];
  categoryName: Scalars['String'];
  postId: Scalars['ID'];
  title: Scalars['String'];
  titleCreatedOn: Scalars['Date'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  user: User;
};

export type CommentArray = {
  __typename?: 'CommentArray';
  comments?: Maybe<Array<Comment>>;
};

export type CommentArrayResult = CommentArray | EntityResult;

export type CommentResult = Comment | EntityResult;

export type Course = {
  __typename?: 'Course';
  category: Category;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  description: Scalars['String'];
  duration: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  startDate: Scalars['String'];
  students?: Maybe<Array<Student>>;
  teacher: User;
  title: Scalars['String'];
  totalStudents: Scalars['Int'];
};

export type CourseArray = {
  __typename?: 'CourseArray';
  courses?: Maybe<Array<Course>>;
};

export type CourseArrayResult = CourseArray | EntityResult;

export type CourseResult = Course | EntityResult;

export type EntityResult = {
  __typename?: 'EntityResult';
  messages?: Maybe<Array<Scalars['String']>>;
};

export type Group = {
  __typename?: 'Group';
  codename: Scalars['String'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  from: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  isRead: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  title: Scalars['String'];
  type: Scalars['String'];
  user: User;
};

export type MsgResult = EntityResult | Message;

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: MsgResult;
  addABook: EntityResult;
  changePassword: Scalars['String'];
  createComment: CommentResult;
  createCourse: EntityResult;
  createPost: EntityResult;
  forgotPassword: Scalars['String'];
  joinOrLeaveCourse: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  newCourseComment: EntityResult;
  newNote: EntityResult;
  newNoteComment: EntityResult;
  register: Scalars['String'];
  resetPassword: Scalars['String'];
  updatePostPoint: MsgResult;
};


export type MutationActivateAccountArgs = {
  token: Scalars['String'];
};


export type MutationAddABookArgs = {
  author: Scalars['String'];
  categoryId: Scalars['ID'];
  description: Scalars['String'];
  group: Scalars['String'];
  image: Scalars['String'];
  link: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  body?: Maybe<Scalars['String']>;
  postId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationCreateCourseArgs = {
  categoryId: Scalars['ID'];
  description: Scalars['String'];
  duration: Scalars['String'];
  endDate: Scalars['String'];
  group: Scalars['String'];
  image: Scalars['String'];
  startDate: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  categoryName: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  usernameOrEmail: Scalars['String'];
};


export type MutationJoinOrLeaveCourseArgs = {
  courseId: Scalars['ID'];
  join: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationLogoutArgs = {
  username: Scalars['String'];
};


export type MutationNewCourseCommentArgs = {
  body?: Maybe<Scalars['String']>;
  courseId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationNewNoteArgs = {
  body: Scalars['String'];
  courseId: Scalars['ID'];
  noteType: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationNewNoteCommentArgs = {
  body?: Maybe<Scalars['String']>;
  noteId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdatePostPointArgs = {
  increment: Scalars['Boolean'];
  postId: Scalars['ID'];
};

export type Note = {
  __typename?: 'Note';
  adminUser: User;
  body: Scalars['String'];
  comment?: Maybe<Array<Comment>>;
  course: Course;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  noteType?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type NoteArray = {
  __typename?: 'NoteArray';
  notes?: Maybe<Array<Note>>;
};

export type NoteArrayResult = EntityResult | NoteArray;

export type NoteResult = EntityResult | Note;

export type Permission = {
  __typename?: 'Permission';
  codename: Scalars['String'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  name: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  category: Category;
  comments?: Maybe<Array<Comment>>;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  creator: User;
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  points: Scalars['Int'];
  title: Scalars['String'];
  views: Scalars['Int'];
};

export type PostArray = {
  __typename?: 'PostArray';
  posts?: Maybe<Array<Post>>;
};

export type PostArrayResult = EntityResult | PostArray;

export type PostPoint = {
  __typename?: 'PostPoint';
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDecrement: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  post: Post;
  user: User;
};

export type PostResult = EntityResult | Post;

export type Query = {
  __typename?: 'Query';
  getAllCategories?: Maybe<Array<Category>>;
  getBooks: BookArrayResult;
  getBooksByCategoryId: BookArrayResult;
  getCommentsByCourseId: CommentArrayResult;
  getCommentsByNoteId: CommentArrayResult;
  getCommentsByPostId: CommentArrayResult;
  getCourseById: CourseResult;
  getCoursesByCategoryId: CourseArrayResult;
  getLatestCourses: CourseArrayResult;
  getLatestPosts: PostArrayResult;
  getNotesByCourseId: NoteArrayResult;
  getPostById?: Maybe<PostResult>;
  getPostsByCategoryId: PostArrayResult;
  getStudentsByCourseId: StudentArrayResult;
  getTopCategoryPost?: Maybe<Array<CategoryPost>>;
  me: UserResult;
};


export type QueryGetBooksByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};


export type QueryGetCommentsByCourseIdArgs = {
  courseId: Scalars['ID'];
};


export type QueryGetCommentsByNoteIdArgs = {
  noteId: Scalars['ID'];
};


export type QueryGetCommentsByPostIdArgs = {
  postId: Scalars['ID'];
};


export type QueryGetCourseByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetCoursesByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};


export type QueryGetNotesByCourseIdArgs = {
  courseId: Scalars['ID'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetPostsByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};


export type QueryGetStudentsByCourseIdArgs = {
  courseId: Scalars['ID'];
};

export type Student = {
  __typename?: 'Student';
  course: Course;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  hasJoined: Scalars['Boolean'];
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  user?: Maybe<Array<User>>;
};

export type StudentArray = {
  __typename?: 'StudentArray';
  students?: Maybe<Array<User>>;
};

export type StudentArrayResult = EntityResult | StudentArray;

export type Subscription = {
  __typename?: 'Subscription';
  accountActivated: Message;
  newComment: Comment;
  newLike: Message;
};

export type User = {
  __typename?: 'User';
  backgroundImg: Scalars['String'];
  books?: Maybe<Array<Book>>;
  comments?: Maybe<Array<Comment>>;
  confirmed: Scalars['Boolean'];
  courses?: Maybe<Array<Course>>;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  notes?: Maybe<Array<Note>>;
  password: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  profileImage: Scalars['String'];
  username: Scalars['String'];
};

export type UserResult = EntityResult | User;

export type ActivateAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ActivateAccountMutation = { __typename?: 'Mutation', activateAccount: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'Message', id: string, from: string, image: string, isRead: boolean, title: string, body: string, type: string, createdOn: any } };

export type ForgotPasswordMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type CreateCommentMutationVariables = Exact<{
  userId: Scalars['ID'];
  postId: Scalars['ID'];
  body?: Maybe<Scalars['String']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, body: string, createdBy: string, createdOn: any, user: { __typename?: 'User', id: string, username: string } } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type JoinOrLeaveCourseMutationVariables = Exact<{
  courseId: Scalars['ID'];
  join: Scalars['Boolean'];
}>;


export type JoinOrLeaveCourseMutation = { __typename?: 'Mutation', joinOrLeaveCourse: string };

export type CreatePostMutationVariables = Exact<{
  userId: Scalars['ID'];
  categoryName: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type UpdatePostPointMutationVariables = Exact<{
  postId: Scalars['ID'];
  increment: Scalars['Boolean'];
}>;


export type UpdatePostPointMutation = { __typename?: 'Mutation', updatePostPoint: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'Message', id: string, from: string, image: string, isRead: boolean, title: string, body: string, type: string, createdOn: any } };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: { __typename?: 'BookArray', books?: Array<{ __typename?: 'Book', id: string, title: string, description: string, image: string, author: string, link: string, category: { __typename?: 'Category', name: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetCommentsByPostIdQuery = { __typename?: 'Query', getCommentsByPostId: { __typename?: 'CommentArray', comments?: Array<{ __typename?: 'Comment', id: string, body: string, isDisabled: boolean, createdOn: any, createdBy: string, user: { __typename?: 'User', id: string, username: string, profileImage: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetLatestCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestCoursesQuery = { __typename?: 'Query', getLatestCourses: { __typename?: 'CourseArray', courses?: Array<{ __typename?: 'Course', id: string, title: string, duration: string, description: string, image: string, startDate: string, endDate: string, category: { __typename?: 'Category', name: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type CategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryQuery = { __typename?: 'Query', getAllCategories?: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null | undefined }> | null | undefined };

export type GetCourseByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCourseByIdQuery = { __typename?: 'Query', getCourseById: { __typename?: 'Course', id: string, title: string, duration: string, description: string, image: string, startDate: string, endDate: string, totalStudents: number, createdOn: any, teacher: { __typename?: 'User', id: string, fullName: string, profileImage: string }, students?: Array<{ __typename?: 'Student', id: string, user?: Array<{ __typename?: 'User', id: string, username: string }> | null | undefined }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'User', id: string, username: string, fullName: string, confirmed: boolean, profileImage: string, backgroundImg: string, isDisabled: boolean, createdOn: any, groups?: Array<{ __typename?: 'Group', id: string, codename: string }> | null | undefined, posts?: Array<{ __typename?: 'Post', id: string, views: number, points: number, isDisabled: boolean, title: string, body: string, createdOn: any, comments?: Array<{ __typename?: 'Comment', id: string, body: string, isDisabled: boolean, createdOn: any, createdBy: string }> | null | undefined }> | null | undefined } };

export type GetLatestPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestPostsQuery = { __typename?: 'Query', getLatestPosts: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'PostArray', posts?: Array<{ __typename?: 'Post', id: string, views: number, points: number, isDisabled: boolean, title: string, body: string, createdOn: any, createdBy: string, creator: { __typename?: 'User', id: string, username: string }, category: { __typename?: 'Category', id: string, name: string }, comments?: Array<{ __typename?: 'Comment', id: string, body: string, createdBy: string, createdOn: any }> | null | undefined }> | null | undefined } };

export type NewCommentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCommentSubscription = { __typename?: 'Subscription', newComment: { __typename?: 'Comment', id: string, body: string, createdBy: string, isDisabled: boolean, createdOn: any, user: { __typename?: 'User', id: string, username: string, profileImage: string } } };


export const ActivateAccountDocument = gql`
    mutation ActivateAccount($token: String!) {
  activateAccount(token: $token) {
    ... on EntityResult {
      messages
    }
    ... on Message {
      id
      from
      image
      isRead
      title
      body
      type
      createdOn
    }
  }
}
    `;
export type ActivateAccountMutationFn = Apollo.MutationFunction<ActivateAccountMutation, ActivateAccountMutationVariables>;

/**
 * __useActivateAccountMutation__
 *
 * To run a mutation, you first call `useActivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountMutation, { data, loading, error }] = useActivateAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<ActivateAccountMutation, ActivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateAccountMutation, ActivateAccountMutationVariables>(ActivateAccountDocument, options);
      }
export type ActivateAccountMutationHookResult = ReturnType<typeof useActivateAccountMutation>;
export type ActivateAccountMutationResult = Apollo.MutationResult<ActivateAccountMutation>;
export type ActivateAccountMutationOptions = Apollo.BaseMutationOptions<ActivateAccountMutation, ActivateAccountMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($usernameOrEmail: String!) {
  forgotPassword(usernameOrEmail: $usernameOrEmail)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($username: String!) {
  logout(username: $username)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $fullName: String!, $password: String!) {
  register(
    email: $email
    username: $username
    fullName: $fullName
    password: $password
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      fullName: // value for 'fullName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($userId: ID!, $postId: ID!, $body: String) {
  createComment(userId: $userId, postId: $postId, body: $body) {
    ... on EntityResult {
      messages
    }
    ... on Comment {
      id
      body
      createdBy
      createdOn
      user {
        id
        username
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      postId: // value for 'postId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const JoinOrLeaveCourseDocument = gql`
    mutation JoinOrLeaveCourse($courseId: ID!, $join: Boolean!) {
  joinOrLeaveCourse(courseId: $courseId, join: $join)
}
    `;
export type JoinOrLeaveCourseMutationFn = Apollo.MutationFunction<JoinOrLeaveCourseMutation, JoinOrLeaveCourseMutationVariables>;

/**
 * __useJoinOrLeaveCourseMutation__
 *
 * To run a mutation, you first call `useJoinOrLeaveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinOrLeaveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinOrLeaveCourseMutation, { data, loading, error }] = useJoinOrLeaveCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      join: // value for 'join'
 *   },
 * });
 */
export function useJoinOrLeaveCourseMutation(baseOptions?: Apollo.MutationHookOptions<JoinOrLeaveCourseMutation, JoinOrLeaveCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinOrLeaveCourseMutation, JoinOrLeaveCourseMutationVariables>(JoinOrLeaveCourseDocument, options);
      }
export type JoinOrLeaveCourseMutationHookResult = ReturnType<typeof useJoinOrLeaveCourseMutation>;
export type JoinOrLeaveCourseMutationResult = Apollo.MutationResult<JoinOrLeaveCourseMutation>;
export type JoinOrLeaveCourseMutationOptions = Apollo.BaseMutationOptions<JoinOrLeaveCourseMutation, JoinOrLeaveCourseMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($userId: ID!, $categoryName: String!, $title: String!, $body: String!) {
  createPost(
    userId: $userId
    categoryName: $categoryName
    title: $title
    body: $body
  ) {
    messages
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      categoryName: // value for 'categoryName'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostPointDocument = gql`
    mutation UpdatePostPoint($postId: ID!, $increment: Boolean!) {
  updatePostPoint(postId: $postId, increment: $increment) {
    ... on EntityResult {
      messages
    }
    ... on Message {
      id
      from
      image
      isRead
      title
      body
      type
      createdOn
    }
  }
}
    `;
export type UpdatePostPointMutationFn = Apollo.MutationFunction<UpdatePostPointMutation, UpdatePostPointMutationVariables>;

/**
 * __useUpdatePostPointMutation__
 *
 * To run a mutation, you first call `useUpdatePostPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostPointMutation, { data, loading, error }] = useUpdatePostPointMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      increment: // value for 'increment'
 *   },
 * });
 */
export function useUpdatePostPointMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostPointMutation, UpdatePostPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostPointMutation, UpdatePostPointMutationVariables>(UpdatePostPointDocument, options);
      }
export type UpdatePostPointMutationHookResult = ReturnType<typeof useUpdatePostPointMutation>;
export type UpdatePostPointMutationResult = Apollo.MutationResult<UpdatePostPointMutation>;
export type UpdatePostPointMutationOptions = Apollo.BaseMutationOptions<UpdatePostPointMutation, UpdatePostPointMutationVariables>;
export const GetBooksDocument = gql`
    query GetBooks {
  getBooks {
    ... on EntityResult {
      messages
    }
    ... on BookArray {
      books {
        id
        title
        description
        image
        author
        link
        category {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const GetCommentsByPostIdDocument = gql`
    query GetCommentsByPostId($postId: ID!) {
  getCommentsByPostId(postId: $postId) {
    ... on CommentArray {
      comments {
        id
        body
        isDisabled
        createdOn
        createdBy
        user {
          id
          username
          profileImage
        }
      }
    }
    ... on EntityResult {
      messages
    }
  }
}
    `;

/**
 * __useGetCommentsByPostIdQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPostIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsByPostIdQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, options);
      }
export function useGetCommentsByPostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, options);
        }
export type GetCommentsByPostIdQueryHookResult = ReturnType<typeof useGetCommentsByPostIdQuery>;
export type GetCommentsByPostIdLazyQueryHookResult = ReturnType<typeof useGetCommentsByPostIdLazyQuery>;
export type GetCommentsByPostIdQueryResult = Apollo.QueryResult<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>;
export const GetLatestCoursesDocument = gql`
    query GetLatestCourses {
  getLatestCourses {
    ... on EntityResult {
      messages
    }
    ... on CourseArray {
      courses {
        id
        title
        duration
        description
        image
        startDate
        endDate
        category {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetLatestCoursesQuery__
 *
 * To run a query within a React component, call `useGetLatestCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestCoursesQuery, GetLatestCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestCoursesQuery, GetLatestCoursesQueryVariables>(GetLatestCoursesDocument, options);
      }
export function useGetLatestCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestCoursesQuery, GetLatestCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestCoursesQuery, GetLatestCoursesQueryVariables>(GetLatestCoursesDocument, options);
        }
export type GetLatestCoursesQueryHookResult = ReturnType<typeof useGetLatestCoursesQuery>;
export type GetLatestCoursesLazyQueryHookResult = ReturnType<typeof useGetLatestCoursesLazyQuery>;
export type GetLatestCoursesQueryResult = Apollo.QueryResult<GetLatestCoursesQuery, GetLatestCoursesQueryVariables>;
export const CategoryDocument = gql`
    query Category {
  getAllCategories {
    id
    name
    description
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const GetCourseByIdDocument = gql`
    query GetCourseById($id: ID!) {
  getCourseById(id: $id) {
    ... on EntityResult {
      messages
    }
    ... on Course {
      id
      title
      duration
      description
      image
      startDate
      endDate
      totalStudents
      teacher {
        id
        fullName
        profileImage
      }
      createdOn
      students {
        id
        user {
          id
          username
        }
      }
    }
  }
}
    `;

/**
 * __useGetCourseByIdQuery__
 *
 * To run a query within a React component, call `useGetCourseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCourseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCourseByIdQuery, GetCourseByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseByIdQuery, GetCourseByIdQueryVariables>(GetCourseByIdDocument, options);
      }
export function useGetCourseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseByIdQuery, GetCourseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseByIdQuery, GetCourseByIdQueryVariables>(GetCourseByIdDocument, options);
        }
export type GetCourseByIdQueryHookResult = ReturnType<typeof useGetCourseByIdQuery>;
export type GetCourseByIdLazyQueryHookResult = ReturnType<typeof useGetCourseByIdLazyQuery>;
export type GetCourseByIdQueryResult = Apollo.QueryResult<GetCourseByIdQuery, GetCourseByIdQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ... on EntityResult {
      messages
    }
    ... on User {
      id
      username
      fullName
      confirmed
      profileImage
      backgroundImg
      isDisabled
      createdOn
      groups {
        id
        codename
      }
      posts {
        id
        views
        points
        isDisabled
        title
        body
        createdOn
        comments {
          id
          body
          isDisabled
          createdOn
          createdBy
        }
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetLatestPostsDocument = gql`
    query GetLatestPosts {
  getLatestPosts {
    ... on EntityResult {
      messages
    }
    ... on PostArray {
      posts {
        id
        views
        points
        isDisabled
        title
        body
        createdOn
        createdBy
        creator {
          id
          username
        }
        category {
          id
          name
        }
        comments {
          id
          body
          createdBy
          createdOn
        }
      }
    }
  }
}
    `;

/**
 * __useGetLatestPostsQuery__
 *
 * To run a query within a React component, call `useGetLatestPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestPostsQuery, GetLatestPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestPostsQuery, GetLatestPostsQueryVariables>(GetLatestPostsDocument, options);
      }
export function useGetLatestPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestPostsQuery, GetLatestPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestPostsQuery, GetLatestPostsQueryVariables>(GetLatestPostsDocument, options);
        }
export type GetLatestPostsQueryHookResult = ReturnType<typeof useGetLatestPostsQuery>;
export type GetLatestPostsLazyQueryHookResult = ReturnType<typeof useGetLatestPostsLazyQuery>;
export type GetLatestPostsQueryResult = Apollo.QueryResult<GetLatestPostsQuery, GetLatestPostsQueryVariables>;
export const NewCommentDocument = gql`
    subscription NewComment {
  newComment {
    id
    body
    createdBy
    isDisabled
    user {
      id
      username
      profileImage
    }
    createdOn
  }
}
    `;

/**
 * __useNewCommentSubscription__
 *
 * To run a query within a React component, call `useNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCommentSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCommentSubscription, NewCommentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewCommentSubscription, NewCommentSubscriptionVariables>(NewCommentDocument, options);
      }
export type NewCommentSubscriptionHookResult = ReturnType<typeof useNewCommentSubscription>;
export type NewCommentSubscriptionResult = Apollo.SubscriptionResult<NewCommentSubscription>;