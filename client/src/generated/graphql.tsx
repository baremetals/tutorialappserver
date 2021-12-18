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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
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

export type Chat = {
  __typename?: 'Chat';
  chatMsgs?: Maybe<Array<ChatMsg>>;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  owner: User;
  recipient: User;
};

export type ChatArray = {
  __typename?: 'ChatArray';
  chats?: Maybe<Array<Chat>>;
};

export type ChatArrayResult = ChatArray | EntityResult;

export type ChatMsg = {
  __typename?: 'ChatMsg';
  body: Scalars['String'];
  chat: Chat;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  receiver: User;
  sender: User;
};

export type ChatMsgArray = {
  __typename?: 'ChatMsgArray';
  chatMsgs?: Maybe<Array<ChatMsg>>;
};

export type ChatMsgArrayResult = ChatMsgArray | EntityResult;

export type ChatMsgResult = ChatMsg | EntityResult;

export type ChatResult = Chat | EntityResult;

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

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
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

export type MessageArray = {
  __typename?: 'MessageArray';
  msgs?: Maybe<Array<Message>>;
};

export type MessageArrayResult = EntityResult | MessageArray;

export type MsgResult = EntityResult | Message;

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: MsgResult;
  addABook: EntityResult;
  changePassword: Scalars['String'];
  createChatMessage?: Maybe<ChatMsgResult>;
  createComment: CommentResult;
  createCourse: EntityResult;
  createPost: EntityResult;
  deleteAllMessagesByUserId: Scalars['String'];
  deleteChat: Scalars['String'];
  deleteChatMsg: Scalars['String'];
  deleteComment: Scalars['String'];
  deleteCourse: Scalars['String'];
  deleteMe: Scalars['String'];
  deleteMessage: Scalars['String'];
  deleteNote: Scalars['String'];
  deletePost: Scalars['String'];
  editBackGroundImage: Scalars['String'];
  editChatMsg?: Maybe<ChatMsgResult>;
  editComment: CommentResult;
  editCourse: EntityResult;
  editMe: Scalars['String'];
  editNote: EntityResult;
  editPost: EntityResult;
  editProfileImage: Scalars['String'];
  forgotPassword: Scalars['String'];
  joinOrLeaveCourse: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  markAllMessagesReadByUserId: Scalars['String'];
  markMessageRead: Scalars['String'];
  newCourseComment: EntityResult;
  newNote: EntityResult;
  newNoteComment: EntityResult;
  register: Scalars['String'];
  resetPassword: Scalars['String'];
  respondToChatMessage?: Maybe<ChatMsgResult>;
  updatePostPoint: Scalars['String'];
  uploadFile: Scalars['String'];
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
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateChatMessageArgs = {
  body: Scalars['String'];
  ownerUserId: Scalars['String'];
  username: Scalars['String'];
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
  mediaUrl: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationDeleteAllMessagesByUserIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteChatArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteChatMsgArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNoteArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationEditBackGroundImageArgs = {
  backgroundImg: Scalars['String'];
};


export type MutationEditChatMsgArgs = {
  body: Scalars['String'];
  id: Scalars['ID'];
};


export type MutationEditCommentArgs = {
  body: Scalars['String'];
  id: Scalars['ID'];
};


export type MutationEditCourseArgs = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  startDate: Scalars['String'];
  title: Scalars['String'];
};


export type MutationEditMeArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  username: Scalars['String'];
};


export type MutationEditNoteArgs = {
  body: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationEditPostArgs = {
  body: Scalars['String'];
  categoryId: Scalars['ID'];
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationEditProfileImageArgs = {
  profileImage: Scalars['String'];
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


export type MutationMarkAllMessagesReadByUserIdArgs = {
  id: Scalars['ID'];
};


export type MutationMarkMessageReadArgs = {
  id: Scalars['ID'];
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


export type MutationRespondToChatMessageArgs = {
  body: Scalars['String'];
  chatId: Scalars['String'];
  senderUserId: Scalars['String'];
};


export type MutationUpdatePostPointArgs = {
  increment: Scalars['Boolean'];
  postId: Scalars['ID'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  id: Scalars['ID'];
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
  mediaUrl: Scalars['String'];
  points: Scalars['Int'];
  postPoints?: Maybe<Array<PostPoint>>;
  slug: Scalars['String'];
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

export type PostPointArray = {
  __typename?: 'PostPointArray';
  postPoints?: Maybe<Array<PostPoint>>;
};

export type PostPointArrayResult = EntityResult | PostPointArray;

export type PostPointResult = EntityResult | PostPoint;

export type PostResult = EntityResult | Post;

export type Query = {
  __typename?: 'Query';
  getAllCategories?: Maybe<Array<Category>>;
  getAllChatMsgs: ChatMsgArrayResult;
  getAllChats: ChatArrayResult;
  getAllChatsByUserId: ChatArrayResult;
  getAllUnReadChatMsgsByUserId: ChatMsgArrayResult;
  getBooks: BookArrayResult;
  getBooksByCategoryId: BookArrayResult;
  getChatMessagesByChatId: ChatMsgArrayResult;
  getCommentsByCourseId: CommentArrayResult;
  getCommentsByNoteId: CommentArrayResult;
  getCommentsByPostSlug: CommentArrayResult;
  getCourseById: CourseResult;
  getCoursesByCategoryId: CourseArrayResult;
  getLatestCourses: CourseArrayResult;
  getLatestPosts: PostArrayResult;
  getMessagesByUserId: MessageArrayResult;
  getNotesByCourseId: NoteArrayResult;
  getPostBySlug?: Maybe<PostResult>;
  getPostsByCategoryId: PostArrayResult;
  getStudentsByCourseId: StudentArrayResult;
  getTopCategoryPost?: Maybe<Array<CategoryPost>>;
  getUnReadMessagesByUserId: MessageArrayResult;
  getUserBySlugId?: Maybe<UserResult>;
  me: UserResult;
  searchAllChatsByUserId: ChatMsgArrayResult;
  searchUsers: UserArrayResult;
  uploads?: Maybe<Array<Maybe<File>>>;
};


export type QueryGetBooksByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};


export type QueryGetChatMessagesByChatIdArgs = {
  chatId: Scalars['ID'];
};


export type QueryGetCommentsByCourseIdArgs = {
  courseId: Scalars['ID'];
};


export type QueryGetCommentsByNoteIdArgs = {
  noteId: Scalars['ID'];
};


export type QueryGetCommentsByPostSlugArgs = {
  slug: Scalars['String'];
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


export type QueryGetPostBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetPostsByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};


export type QueryGetStudentsByCourseIdArgs = {
  courseId: Scalars['ID'];
};


export type QueryGetUserBySlugIdArgs = {
  userIdSlug: Scalars['String'];
};


export type QuerySearchAllChatsByUserIdArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QuerySearchUsersArgs = {
  searchItem: Scalars['String'];
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
  user: User;
};

export type StudentArray = {
  __typename?: 'StudentArray';
  students?: Maybe<Array<User>>;
};

export type StudentArrayResult = EntityResult | StudentArray;

export type Subscription = {
  __typename?: 'Subscription';
  accountActivated: Message;
  newChat: Chat;
  newChatMessage: ChatMsg;
  newComment: Comment;
  newMessage: Message;
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
  description: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  location: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  password: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  profileImage: Scalars['String'];
  userIdSlug?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserArray = {
  __typename?: 'UserArray';
  users?: Maybe<Array<User>>;
};

export type UserArrayResult = EntityResult | UserArray;

export type UserResult = EntityResult | User;

export type ActivateAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ActivateAccountMutation = { __typename?: 'Mutation', activateAccount: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'Message', id: string, from: string, image: string, isRead: boolean, title: string, body: string, type: string, createdOn: any } };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: string };

export type EditMeMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  fullName: Scalars['String'];
}>;


export type EditMeMutation = { __typename?: 'Mutation', editMe: string };

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

export type CreateChatMessageMutationVariables = Exact<{
  ownerUserId: Scalars['String'];
  username: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateChatMessageMutation = { __typename?: 'Mutation', createChatMessage?: { __typename?: 'ChatMsg' } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | null | undefined };

export type RespondToChatMessageMutationVariables = Exact<{
  senderUserId: Scalars['String'];
  chatId: Scalars['String'];
  body: Scalars['String'];
}>;


export type RespondToChatMessageMutation = { __typename?: 'Mutation', respondToChatMessage?: { __typename?: 'ChatMsg' } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | null | undefined };

export type CreateCommentMutationVariables = Exact<{
  userId: Scalars['ID'];
  postId: Scalars['ID'];
  body?: Maybe<Scalars['String']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, body: string, createdBy: string, createdOn: any, user: { __typename?: 'User', id: string, username: string, userIdSlug?: string | null | undefined } } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

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
  mediaUrl: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['ID'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: string };

export type UpdatePostPointMutationVariables = Exact<{
  postId: Scalars['ID'];
  increment: Scalars['Boolean'];
}>;


export type UpdatePostPointMutation = { __typename?: 'Mutation', updatePostPoint: string };

export type DeleteMeMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteMeMutation = { __typename?: 'Mutation', deleteMe: string };

export type EditBackGroundImageMutationVariables = Exact<{
  backgroundImg: Scalars['String'];
}>;


export type EditBackGroundImageMutation = { __typename?: 'Mutation', editBackGroundImage: string };

export type EditProfileImageMutationVariables = Exact<{
  profileImage: Scalars['String'];
}>;


export type EditProfileImageMutation = { __typename?: 'Mutation', editProfileImage: string };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: { __typename?: 'BookArray', books?: Array<{ __typename?: 'Book', id: string, title: string, description: string, image: string, author: string, link: string, category: { __typename?: 'Category', name: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetAllUnReadChatMsgsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUnReadChatMsgsByUserIdQuery = { __typename?: 'Query', getAllUnReadChatMsgsByUserId: { __typename?: 'ChatMsgArray', chatMsgs?: Array<{ __typename?: 'ChatMsg', id: string, body: string }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetAllChatsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllChatsByUserIdQuery = { __typename?: 'Query', getAllChatsByUserId: { __typename?: 'ChatArray', chats?: Array<{ __typename?: 'Chat', id: string, owner: { __typename?: 'User', id: string, username: string, profileImage: string }, recipient: { __typename?: 'User', id: string, username: string, profileImage: string }, chatMsgs?: Array<{ __typename?: 'ChatMsg', id: string, isRead: boolean, body: string, createdOn: any }> | null | undefined }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetChatMessagesByChatIdQueryVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type GetChatMessagesByChatIdQuery = { __typename?: 'Query', getChatMessagesByChatId: { __typename?: 'ChatMsgArray', chatMsgs?: Array<{ __typename?: 'ChatMsg', id: string, body: string, createdOn: any, sender: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string }, receiver: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type SearchAllChatsByUserIdQueryVariables = Exact<{
  username?: Maybe<Scalars['String']>;
}>;


export type SearchAllChatsByUserIdQuery = { __typename?: 'Query', searchAllChatsByUserId: { __typename?: 'ChatMsgArray', chatMsgs?: Array<{ __typename?: 'ChatMsg', id: string, body: string, createdOn: any, sender: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string }, receiver: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string }, chat: { __typename?: 'Chat', id: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetLatestCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestCoursesQuery = { __typename?: 'Query', getLatestCourses: { __typename?: 'CourseArray', courses?: Array<{ __typename?: 'Course', id: string, title: string, duration: string, description: string, image: string, startDate: string, endDate: string, category: { __typename?: 'Category', name: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetCourseByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCourseByIdQuery = { __typename?: 'Query', getCourseById: { __typename?: 'Course', id: string, title: string, duration: string, description: string, image: string, startDate: string, endDate: string, totalStudents: number, createdOn: any, teacher: { __typename?: 'User', id: string, fullName: string, profileImage: string }, students?: Array<{ __typename?: 'Student', id: string, user: { __typename?: 'User', id: string, username: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type CategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryQuery = { __typename?: 'Query', getAllCategories?: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null | undefined }> | null | undefined };

export type GetMessagesByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesByUserIdQuery = { __typename?: 'Query', getMessagesByUserId: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'MessageArray', msgs?: Array<{ __typename?: 'Message', id: string, from: string, image: string, isRead: boolean, title: string, body: string, type: string, createdOn: any }> | null | undefined } };

export type GetUnReadMessagesByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnReadMessagesByUserIdQuery = { __typename?: 'Query', getUnReadMessagesByUserId: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'MessageArray', msgs?: Array<{ __typename?: 'Message', id: string }> | null | undefined } };

export type GetCommentsByPostSlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetCommentsByPostSlugQuery = { __typename?: 'Query', getCommentsByPostSlug: { __typename?: 'CommentArray', comments?: Array<{ __typename?: 'Comment', id: string, body: string, isDisabled: boolean, createdOn: any, createdBy: string, user: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, profileImage: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type GetPostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostBySlugQuery = { __typename?: 'Query', getPostBySlug?: { __typename?: 'EntityResult' } | { __typename?: 'Post', id: string, slug: string, views: number, points: number, title: string, body: string, mediaUrl: string, createdOn: any, createdBy: string, creator: { __typename?: 'User', id: string, username: string, profileImage: string }, comments?: Array<{ __typename?: 'Comment', id: string }> | null | undefined, postPoints?: Array<{ __typename?: 'PostPoint', id: string, user: { __typename?: 'User', id: string } }> | null | undefined, category: { __typename?: 'Category', id: string, name: string } } | null | undefined };

export type GetLatestPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestPostsQuery = { __typename?: 'Query', getLatestPosts: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'PostArray', posts?: Array<{ __typename?: 'Post', id: string, slug: string, views: number, points: number, title: string, body: string, mediaUrl: string, createdBy: string, createdOn: any, creator: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, profileImage: string }, comments?: Array<{ __typename?: 'Comment', id: string, body: string, createdBy: string, createdOn: any }> | null | undefined, category: { __typename?: 'Category', id: string, name: string } }> | null | undefined } };

export type GetUserBySlugIdQueryVariables = Exact<{
  userIdSlug: Scalars['String'];
}>;


export type GetUserBySlugIdQuery = { __typename?: 'Query', getUserBySlugId?: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, fullName: string, description: string, location: string, isOnline: boolean, profileImage: string, backgroundImg: string, createdOn: any, posts?: Array<{ __typename?: 'Post', id: string, slug: string, views: number, points: number, title: string, body: string, comments?: Array<{ __typename?: 'Comment', id: string, body: string, createdOn: any, createdBy: string, user: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, profileImage: string } }> | null | undefined }> | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, email: string, fullName: string, description: string, location: string, isOnline: boolean, isDisabled: boolean, profileImage: string, backgroundImg: string, createdOn: any, groups?: Array<{ __typename?: 'Group', id: string, codename: string }> | null | undefined, posts?: Array<{ __typename?: 'Post', id: string, slug: string, views: number, points: number, title: string, body: string, createdOn: any, comments?: Array<{ __typename?: 'Comment', id: string, body: string, isDisabled: boolean, createdOn: any, createdBy: string }> | null | undefined }> | null | undefined } };

export type SearchUsersQueryVariables = Exact<{
  searchItem: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'UserArray', users?: Array<{ __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, profileImage: string, isOnline: boolean }> | null | undefined } };

export type NewChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewChatSubscription = { __typename?: 'Subscription', newChat: { __typename?: 'Chat', id: string, owner: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string }, recipient: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string }, chatMsgs?: Array<{ __typename?: 'ChatMsg', id: string }> | null | undefined } };

export type NewChatMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewChatMessageSubscription = { __typename?: 'Subscription', newChatMessage: { __typename?: 'ChatMsg', id: string, body: string, createdOn: any, sender: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string }, receiver: { __typename?: 'User', id: string, userIdSlug?: string | null | undefined, username: string, isOnline: boolean, profileImage: string } } };

export type NewCommentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCommentSubscription = { __typename?: 'Subscription', newComment: { __typename?: 'Comment', id: string, body: string, createdBy: string, isDisabled: boolean, createdOn: any, user: { __typename?: 'User', id: string, username: string, profileImage: string } } };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, from: string, image: string, isRead: boolean, title: string, body: string, type: string, createdOn: any, user: { __typename?: 'User', id: string, username: string, profileImage: string } } };


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
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const EditMeDocument = gql`
    mutation EditMe($email: String!, $username: String!, $fullName: String!) {
  editMe(email: $email, username: $username, fullName: $fullName)
}
    `;
export type EditMeMutationFn = Apollo.MutationFunction<EditMeMutation, EditMeMutationVariables>;

/**
 * __useEditMeMutation__
 *
 * To run a mutation, you first call `useEditMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMeMutation, { data, loading, error }] = useEditMeMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      fullName: // value for 'fullName'
 *   },
 * });
 */
export function useEditMeMutation(baseOptions?: Apollo.MutationHookOptions<EditMeMutation, EditMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMeMutation, EditMeMutationVariables>(EditMeDocument, options);
      }
export type EditMeMutationHookResult = ReturnType<typeof useEditMeMutation>;
export type EditMeMutationResult = Apollo.MutationResult<EditMeMutation>;
export type EditMeMutationOptions = Apollo.BaseMutationOptions<EditMeMutation, EditMeMutationVariables>;
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
export const CreateChatMessageDocument = gql`
    mutation CreateChatMessage($ownerUserId: String!, $username: String!, $body: String!) {
  createChatMessage(ownerUserId: $ownerUserId, username: $username, body: $body) {
    ... on EntityResult {
      messages
    }
  }
}
    `;
export type CreateChatMessageMutationFn = Apollo.MutationFunction<CreateChatMessageMutation, CreateChatMessageMutationVariables>;

/**
 * __useCreateChatMessageMutation__
 *
 * To run a mutation, you first call `useCreateChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMessageMutation, { data, loading, error }] = useCreateChatMessageMutation({
 *   variables: {
 *      ownerUserId: // value for 'ownerUserId'
 *      username: // value for 'username'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateChatMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMessageMutation, CreateChatMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMessageMutation, CreateChatMessageMutationVariables>(CreateChatMessageDocument, options);
      }
export type CreateChatMessageMutationHookResult = ReturnType<typeof useCreateChatMessageMutation>;
export type CreateChatMessageMutationResult = Apollo.MutationResult<CreateChatMessageMutation>;
export type CreateChatMessageMutationOptions = Apollo.BaseMutationOptions<CreateChatMessageMutation, CreateChatMessageMutationVariables>;
export const RespondToChatMessageDocument = gql`
    mutation RespondToChatMessage($senderUserId: String!, $chatId: String!, $body: String!) {
  respondToChatMessage(senderUserId: $senderUserId, chatId: $chatId, body: $body) {
    ... on EntityResult {
      messages
    }
  }
}
    `;
export type RespondToChatMessageMutationFn = Apollo.MutationFunction<RespondToChatMessageMutation, RespondToChatMessageMutationVariables>;

/**
 * __useRespondToChatMessageMutation__
 *
 * To run a mutation, you first call `useRespondToChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToChatMessageMutation, { data, loading, error }] = useRespondToChatMessageMutation({
 *   variables: {
 *      senderUserId: // value for 'senderUserId'
 *      chatId: // value for 'chatId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useRespondToChatMessageMutation(baseOptions?: Apollo.MutationHookOptions<RespondToChatMessageMutation, RespondToChatMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondToChatMessageMutation, RespondToChatMessageMutationVariables>(RespondToChatMessageDocument, options);
      }
export type RespondToChatMessageMutationHookResult = ReturnType<typeof useRespondToChatMessageMutation>;
export type RespondToChatMessageMutationResult = Apollo.MutationResult<RespondToChatMessageMutation>;
export type RespondToChatMessageMutationOptions = Apollo.BaseMutationOptions<RespondToChatMessageMutation, RespondToChatMessageMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($userId: ID!, $postId: ID!, $body: String) {
  createComment(userId: $userId, postId: $postId, body: $body) {
    ... on Comment {
      id
      body
      createdBy
      createdOn
      user {
        id
        username
        userIdSlug
      }
    }
    ... on EntityResult {
      messages
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
    mutation CreatePost($userId: ID!, $categoryName: String!, $title: String!, $body: String!, $mediaUrl: String!) {
  createPost(
    userId: $userId
    categoryName: $categoryName
    title: $title
    body: $body
    mediaUrl: $mediaUrl
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
 *      mediaUrl: // value for 'mediaUrl'
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
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!, $id: ID!) {
  uploadFile(file: $file, id: $id)
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const UpdatePostPointDocument = gql`
    mutation UpdatePostPoint($postId: ID!, $increment: Boolean!) {
  updatePostPoint(postId: $postId, increment: $increment)
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
export const DeleteMeDocument = gql`
    mutation DeleteMe {
  deleteMe
}
    `;
export type DeleteMeMutationFn = Apollo.MutationFunction<DeleteMeMutation, DeleteMeMutationVariables>;

/**
 * __useDeleteMeMutation__
 *
 * To run a mutation, you first call `useDeleteMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeMutation, { data, loading, error }] = useDeleteMeMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteMeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeMutation, DeleteMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeMutation, DeleteMeMutationVariables>(DeleteMeDocument, options);
      }
export type DeleteMeMutationHookResult = ReturnType<typeof useDeleteMeMutation>;
export type DeleteMeMutationResult = Apollo.MutationResult<DeleteMeMutation>;
export type DeleteMeMutationOptions = Apollo.BaseMutationOptions<DeleteMeMutation, DeleteMeMutationVariables>;
export const EditBackGroundImageDocument = gql`
    mutation EditBackGroundImage($backgroundImg: String!) {
  editBackGroundImage(backgroundImg: $backgroundImg)
}
    `;
export type EditBackGroundImageMutationFn = Apollo.MutationFunction<EditBackGroundImageMutation, EditBackGroundImageMutationVariables>;

/**
 * __useEditBackGroundImageMutation__
 *
 * To run a mutation, you first call `useEditBackGroundImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBackGroundImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBackGroundImageMutation, { data, loading, error }] = useEditBackGroundImageMutation({
 *   variables: {
 *      backgroundImg: // value for 'backgroundImg'
 *   },
 * });
 */
export function useEditBackGroundImageMutation(baseOptions?: Apollo.MutationHookOptions<EditBackGroundImageMutation, EditBackGroundImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditBackGroundImageMutation, EditBackGroundImageMutationVariables>(EditBackGroundImageDocument, options);
      }
export type EditBackGroundImageMutationHookResult = ReturnType<typeof useEditBackGroundImageMutation>;
export type EditBackGroundImageMutationResult = Apollo.MutationResult<EditBackGroundImageMutation>;
export type EditBackGroundImageMutationOptions = Apollo.BaseMutationOptions<EditBackGroundImageMutation, EditBackGroundImageMutationVariables>;
export const EditProfileImageDocument = gql`
    mutation EditProfileImage($profileImage: String!) {
  editProfileImage(profileImage: $profileImage)
}
    `;
export type EditProfileImageMutationFn = Apollo.MutationFunction<EditProfileImageMutation, EditProfileImageMutationVariables>;

/**
 * __useEditProfileImageMutation__
 *
 * To run a mutation, you first call `useEditProfileImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileImageMutation, { data, loading, error }] = useEditProfileImageMutation({
 *   variables: {
 *      profileImage: // value for 'profileImage'
 *   },
 * });
 */
export function useEditProfileImageMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileImageMutation, EditProfileImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileImageMutation, EditProfileImageMutationVariables>(EditProfileImageDocument, options);
      }
export type EditProfileImageMutationHookResult = ReturnType<typeof useEditProfileImageMutation>;
export type EditProfileImageMutationResult = Apollo.MutationResult<EditProfileImageMutation>;
export type EditProfileImageMutationOptions = Apollo.BaseMutationOptions<EditProfileImageMutation, EditProfileImageMutationVariables>;
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
export const GetAllUnReadChatMsgsByUserIdDocument = gql`
    query GetAllUnReadChatMsgsByUserId {
  getAllUnReadChatMsgsByUserId {
    ... on EntityResult {
      messages
    }
    ... on ChatMsgArray {
      chatMsgs {
        id
        body
      }
    }
  }
}
    `;

/**
 * __useGetAllUnReadChatMsgsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAllUnReadChatMsgsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUnReadChatMsgsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUnReadChatMsgsByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUnReadChatMsgsByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUnReadChatMsgsByUserIdQuery, GetAllUnReadChatMsgsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUnReadChatMsgsByUserIdQuery, GetAllUnReadChatMsgsByUserIdQueryVariables>(GetAllUnReadChatMsgsByUserIdDocument, options);
      }
export function useGetAllUnReadChatMsgsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUnReadChatMsgsByUserIdQuery, GetAllUnReadChatMsgsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUnReadChatMsgsByUserIdQuery, GetAllUnReadChatMsgsByUserIdQueryVariables>(GetAllUnReadChatMsgsByUserIdDocument, options);
        }
export type GetAllUnReadChatMsgsByUserIdQueryHookResult = ReturnType<typeof useGetAllUnReadChatMsgsByUserIdQuery>;
export type GetAllUnReadChatMsgsByUserIdLazyQueryHookResult = ReturnType<typeof useGetAllUnReadChatMsgsByUserIdLazyQuery>;
export type GetAllUnReadChatMsgsByUserIdQueryResult = Apollo.QueryResult<GetAllUnReadChatMsgsByUserIdQuery, GetAllUnReadChatMsgsByUserIdQueryVariables>;
export const GetAllChatsByUserIdDocument = gql`
    query GetAllChatsByUserId {
  getAllChatsByUserId {
    ... on EntityResult {
      messages
    }
    ... on ChatArray {
      chats {
        id
        owner {
          id
          username
          profileImage
        }
        recipient {
          id
          username
          profileImage
        }
        chatMsgs {
          id
          isRead
          body
          createdOn
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllChatsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAllChatsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChatsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChatsByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllChatsByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAllChatsByUserIdQuery, GetAllChatsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllChatsByUserIdQuery, GetAllChatsByUserIdQueryVariables>(GetAllChatsByUserIdDocument, options);
      }
export function useGetAllChatsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllChatsByUserIdQuery, GetAllChatsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllChatsByUserIdQuery, GetAllChatsByUserIdQueryVariables>(GetAllChatsByUserIdDocument, options);
        }
export type GetAllChatsByUserIdQueryHookResult = ReturnType<typeof useGetAllChatsByUserIdQuery>;
export type GetAllChatsByUserIdLazyQueryHookResult = ReturnType<typeof useGetAllChatsByUserIdLazyQuery>;
export type GetAllChatsByUserIdQueryResult = Apollo.QueryResult<GetAllChatsByUserIdQuery, GetAllChatsByUserIdQueryVariables>;
export const GetChatMessagesByChatIdDocument = gql`
    query GetChatMessagesByChatId($chatId: ID!) {
  getChatMessagesByChatId(chatId: $chatId) {
    ... on EntityResult {
      messages
    }
    ... on ChatMsgArray {
      chatMsgs {
        id
        body
        createdOn
        sender {
          id
          userIdSlug
          username
          isOnline
          profileImage
        }
        receiver {
          id
          userIdSlug
          username
          isOnline
          profileImage
        }
      }
    }
  }
}
    `;

/**
 * __useGetChatMessagesByChatIdQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesByChatIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesByChatIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesByChatIdQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatMessagesByChatIdQuery(baseOptions: Apollo.QueryHookOptions<GetChatMessagesByChatIdQuery, GetChatMessagesByChatIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatMessagesByChatIdQuery, GetChatMessagesByChatIdQueryVariables>(GetChatMessagesByChatIdDocument, options);
      }
export function useGetChatMessagesByChatIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatMessagesByChatIdQuery, GetChatMessagesByChatIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatMessagesByChatIdQuery, GetChatMessagesByChatIdQueryVariables>(GetChatMessagesByChatIdDocument, options);
        }
export type GetChatMessagesByChatIdQueryHookResult = ReturnType<typeof useGetChatMessagesByChatIdQuery>;
export type GetChatMessagesByChatIdLazyQueryHookResult = ReturnType<typeof useGetChatMessagesByChatIdLazyQuery>;
export type GetChatMessagesByChatIdQueryResult = Apollo.QueryResult<GetChatMessagesByChatIdQuery, GetChatMessagesByChatIdQueryVariables>;
export const SearchAllChatsByUserIdDocument = gql`
    query SearchAllChatsByUserId($username: String) {
  searchAllChatsByUserId(username: $username) {
    ... on EntityResult {
      messages
    }
    ... on ChatMsgArray {
      chatMsgs {
        id
        body
        createdOn
        sender {
          id
          userIdSlug
          username
          isOnline
          profileImage
        }
        receiver {
          id
          userIdSlug
          username
          isOnline
          profileImage
        }
        chat {
          id
        }
      }
    }
  }
}
    `;

/**
 * __useSearchAllChatsByUserIdQuery__
 *
 * To run a query within a React component, call `useSearchAllChatsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAllChatsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAllChatsByUserIdQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchAllChatsByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<SearchAllChatsByUserIdQuery, SearchAllChatsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAllChatsByUserIdQuery, SearchAllChatsByUserIdQueryVariables>(SearchAllChatsByUserIdDocument, options);
      }
export function useSearchAllChatsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAllChatsByUserIdQuery, SearchAllChatsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAllChatsByUserIdQuery, SearchAllChatsByUserIdQueryVariables>(SearchAllChatsByUserIdDocument, options);
        }
export type SearchAllChatsByUserIdQueryHookResult = ReturnType<typeof useSearchAllChatsByUserIdQuery>;
export type SearchAllChatsByUserIdLazyQueryHookResult = ReturnType<typeof useSearchAllChatsByUserIdLazyQuery>;
export type SearchAllChatsByUserIdQueryResult = Apollo.QueryResult<SearchAllChatsByUserIdQuery, SearchAllChatsByUserIdQueryVariables>;
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
export const GetMessagesByUserIdDocument = gql`
    query GetMessagesByUserId {
  getMessagesByUserId {
    ... on EntityResult {
      messages
    }
    ... on MessageArray {
      msgs {
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
}
    `;

/**
 * __useGetMessagesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetMessagesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessagesByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesByUserIdQuery, GetMessagesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByUserIdQuery, GetMessagesByUserIdQueryVariables>(GetMessagesByUserIdDocument, options);
      }
export function useGetMessagesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByUserIdQuery, GetMessagesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByUserIdQuery, GetMessagesByUserIdQueryVariables>(GetMessagesByUserIdDocument, options);
        }
export type GetMessagesByUserIdQueryHookResult = ReturnType<typeof useGetMessagesByUserIdQuery>;
export type GetMessagesByUserIdLazyQueryHookResult = ReturnType<typeof useGetMessagesByUserIdLazyQuery>;
export type GetMessagesByUserIdQueryResult = Apollo.QueryResult<GetMessagesByUserIdQuery, GetMessagesByUserIdQueryVariables>;
export const GetUnReadMessagesByUserIdDocument = gql`
    query GetUnReadMessagesByUserId {
  getUnReadMessagesByUserId {
    ... on EntityResult {
      messages
    }
    ... on MessageArray {
      msgs {
        id
      }
    }
  }
}
    `;

/**
 * __useGetUnReadMessagesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetUnReadMessagesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnReadMessagesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnReadMessagesByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnReadMessagesByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUnReadMessagesByUserIdQuery, GetUnReadMessagesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnReadMessagesByUserIdQuery, GetUnReadMessagesByUserIdQueryVariables>(GetUnReadMessagesByUserIdDocument, options);
      }
export function useGetUnReadMessagesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnReadMessagesByUserIdQuery, GetUnReadMessagesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnReadMessagesByUserIdQuery, GetUnReadMessagesByUserIdQueryVariables>(GetUnReadMessagesByUserIdDocument, options);
        }
export type GetUnReadMessagesByUserIdQueryHookResult = ReturnType<typeof useGetUnReadMessagesByUserIdQuery>;
export type GetUnReadMessagesByUserIdLazyQueryHookResult = ReturnType<typeof useGetUnReadMessagesByUserIdLazyQuery>;
export type GetUnReadMessagesByUserIdQueryResult = Apollo.QueryResult<GetUnReadMessagesByUserIdQuery, GetUnReadMessagesByUserIdQueryVariables>;
export const GetCommentsByPostSlugDocument = gql`
    query GetCommentsByPostSlug($slug: String!) {
  getCommentsByPostSlug(slug: $slug) {
    ... on CommentArray {
      comments {
        id
        body
        isDisabled
        createdOn
        createdBy
        user {
          id
          userIdSlug
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
 * __useGetCommentsByPostSlugQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPostSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPostSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPostSlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCommentsByPostSlugQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsByPostSlugQuery, GetCommentsByPostSlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsByPostSlugQuery, GetCommentsByPostSlugQueryVariables>(GetCommentsByPostSlugDocument, options);
      }
export function useGetCommentsByPostSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByPostSlugQuery, GetCommentsByPostSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsByPostSlugQuery, GetCommentsByPostSlugQueryVariables>(GetCommentsByPostSlugDocument, options);
        }
export type GetCommentsByPostSlugQueryHookResult = ReturnType<typeof useGetCommentsByPostSlugQuery>;
export type GetCommentsByPostSlugLazyQueryHookResult = ReturnType<typeof useGetCommentsByPostSlugLazyQuery>;
export type GetCommentsByPostSlugQueryResult = Apollo.QueryResult<GetCommentsByPostSlugQuery, GetCommentsByPostSlugQueryVariables>;
export const GetPostBySlugDocument = gql`
    query GetPostBySlug($slug: String!) {
  getPostBySlug(slug: $slug) {
    ... on Post {
      id
      slug
      views
      points
      title
      body
      mediaUrl
      createdOn
      createdBy
      creator {
        id
        username
        profileImage
      }
      comments {
        id
      }
      postPoints {
        id
        user {
          id
        }
      }
      category {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetPostBySlugQuery__
 *
 * To run a query within a React component, call `useGetPostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetPostBySlugQuery, GetPostBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostBySlugQuery, GetPostBySlugQueryVariables>(GetPostBySlugDocument, options);
      }
export function useGetPostBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostBySlugQuery, GetPostBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostBySlugQuery, GetPostBySlugQueryVariables>(GetPostBySlugDocument, options);
        }
export type GetPostBySlugQueryHookResult = ReturnType<typeof useGetPostBySlugQuery>;
export type GetPostBySlugLazyQueryHookResult = ReturnType<typeof useGetPostBySlugLazyQuery>;
export type GetPostBySlugQueryResult = Apollo.QueryResult<GetPostBySlugQuery, GetPostBySlugQueryVariables>;
export const GetLatestPostsDocument = gql`
    query GetLatestPosts {
  getLatestPosts {
    ... on EntityResult {
      messages
    }
    ... on PostArray {
      posts {
        id
        slug
        views
        points
        title
        body
        mediaUrl
        createdBy
        createdOn
        creator {
          id
          userIdSlug
          username
          profileImage
        }
        comments {
          id
          body
          createdBy
          createdOn
        }
        category {
          id
          name
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
export const GetUserBySlugIdDocument = gql`
    query GetUserBySlugId($userIdSlug: String!) {
  getUserBySlugId(userIdSlug: $userIdSlug) {
    ... on EntityResult {
      messages
    }
    ... on User {
      id
      userIdSlug
      username
      fullName
      description
      location
      isOnline
      profileImage
      backgroundImg
      createdOn
      posts {
        id
        slug
        views
        points
        title
        body
        comments {
          id
          body
          createdOn
          createdBy
          user {
            id
            userIdSlug
            username
            profileImage
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserBySlugIdQuery__
 *
 * To run a query within a React component, call `useGetUserBySlugIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBySlugIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBySlugIdQuery({
 *   variables: {
 *      userIdSlug: // value for 'userIdSlug'
 *   },
 * });
 */
export function useGetUserBySlugIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserBySlugIdQuery, GetUserBySlugIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserBySlugIdQuery, GetUserBySlugIdQueryVariables>(GetUserBySlugIdDocument, options);
      }
export function useGetUserBySlugIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserBySlugIdQuery, GetUserBySlugIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserBySlugIdQuery, GetUserBySlugIdQueryVariables>(GetUserBySlugIdDocument, options);
        }
export type GetUserBySlugIdQueryHookResult = ReturnType<typeof useGetUserBySlugIdQuery>;
export type GetUserBySlugIdLazyQueryHookResult = ReturnType<typeof useGetUserBySlugIdLazyQuery>;
export type GetUserBySlugIdQueryResult = Apollo.QueryResult<GetUserBySlugIdQuery, GetUserBySlugIdQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ... on EntityResult {
      messages
    }
    ... on User {
      id
      userIdSlug
      username
      email
      fullName
      description
      location
      isOnline
      isDisabled
      profileImage
      backgroundImg
      createdOn
      groups {
        id
        codename
      }
      posts {
        id
        slug
        views
        points
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
export const SearchUsersDocument = gql`
    query SearchUsers($searchItem: String!) {
  searchUsers(searchItem: $searchItem) {
    ... on EntityResult {
      messages
    }
    ... on UserArray {
      users {
        id
        userIdSlug
        username
        profileImage
        isOnline
      }
    }
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      searchItem: // value for 'searchItem'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const NewChatDocument = gql`
    subscription NewChat {
  newChat {
    id
    owner {
      id
      userIdSlug
      username
      isOnline
      profileImage
    }
    recipient {
      id
      userIdSlug
      username
      isOnline
      profileImage
    }
    chatMsgs {
      id
    }
  }
}
    `;

/**
 * __useNewChatSubscription__
 *
 * To run a query within a React component, call `useNewChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewChatSubscription, NewChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewChatSubscription, NewChatSubscriptionVariables>(NewChatDocument, options);
      }
export type NewChatSubscriptionHookResult = ReturnType<typeof useNewChatSubscription>;
export type NewChatSubscriptionResult = Apollo.SubscriptionResult<NewChatSubscription>;
export const NewChatMessageDocument = gql`
    subscription NewChatMessage {
  newChatMessage {
    id
    body
    createdOn
    sender {
      id
      userIdSlug
      username
      isOnline
      profileImage
    }
    receiver {
      id
      userIdSlug
      username
      isOnline
      profileImage
    }
  }
}
    `;

/**
 * __useNewChatMessageSubscription__
 *
 * To run a query within a React component, call `useNewChatMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewChatMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewChatMessageSubscription, NewChatMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewChatMessageSubscription, NewChatMessageSubscriptionVariables>(NewChatMessageDocument, options);
      }
export type NewChatMessageSubscriptionHookResult = ReturnType<typeof useNewChatMessageSubscription>;
export type NewChatMessageSubscriptionResult = Apollo.SubscriptionResult<NewChatMessageSubscription>;
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
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    id
    from
    image
    isRead
    title
    body
    type
    createdOn
    user {
      id
      username
      profileImage
    }
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;