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
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  post: Post;
  user: User;
};

export type CommentArray = {
  __typename?: 'CommentArray';
  comments?: Maybe<Array<Comment>>;
};

export type CommentArrayResult = CommentArray | EntityResult;

export type CommentResult = Comment | EntityResult;

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

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: Scalars['String'];
  changePassword: Scalars['String'];
  createComment?: Maybe<EntityResult>;
  createPost?: Maybe<EntityResult>;
  forgotPassword: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  register: Scalars['String'];
  resetPassword: Scalars['String'];
  updatePostPoint: Scalars['String'];
};


export type MutationActivateAccountArgs = {
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  body?: Maybe<Scalars['String']>;
  postId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  categoryId: Scalars['ID'];
  postType: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  usernameOrEmail: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationLogoutArgs = {
  username: Scalars['String'];
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
  postType: Scalars['String'];
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
  getCommentsByPostId: CommentArrayResult;
  getLatestPosts: PostArrayResult;
  getPostById?: Maybe<PostResult>;
  getPostsByCategoryId: PostArrayResult;
  getTopCategoryPost?: Maybe<Array<CategoryPost>>;
  me: UserResult;
};


export type QueryGetCommentsByPostIdArgs = {
  postId: Scalars['ID'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetPostsByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  backgroundImg: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  confirmed: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  password: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  profileImage: Scalars['String'];
  username: Scalars['String'];
};

export type UserResult = EntityResult | User;

export type ActivateAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ActivateAccountMutation = { __typename?: 'Mutation', activateAccount: string };

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


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | null | undefined };

export type CreatePostMutationVariables = Exact<{
  userId: Scalars['ID'];
  categoryId: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  postType: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | null | undefined };

export type UpdatePostPointMutationMutationVariables = Exact<{
  postId: Scalars['ID'];
  increment: Scalars['Boolean'];
}>;


export type UpdatePostPointMutationMutation = { __typename?: 'Mutation', updatePostPoint: string };

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetCommentsByPostIdQuery = { __typename?: 'Query', getCommentsByPostId: { __typename?: 'CommentArray', comments?: Array<{ __typename?: 'Comment', id: string, body: string, isDisabled: boolean, createdOn: any, user: { __typename?: 'User', username: string, id: string } }> | null | undefined } | { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } };

export type CategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryQuery = { __typename?: 'Query', getAllCategories?: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null | undefined }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'User', id: string, username: string, fullName: string, confirmed: boolean, profileImage: string, backgroundImg: string, isDisabled: boolean, createdOn: any, groups?: Array<{ __typename?: 'Group', id: string, codename: string }> | null | undefined, posts?: Array<{ __typename?: 'Post', id: string, views: number, points: number, isDisabled: boolean, title: string, body: string, postType: string, createdOn: any, comments?: Array<{ __typename?: 'Comment', id: string, body: string, isDisabled: boolean, createdOn: any, createdBy: string }> | null | undefined }> | null | undefined } };

export type GetLatestPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestPostsQuery = { __typename?: 'Query', getLatestPosts: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'PostArray', posts?: Array<{ __typename?: 'Post', id: string, views: number, points: number, title: string, body: string, postType: string, isDisabled: boolean, createdOn: any, creator: { __typename?: 'User', username: string }, category: { __typename?: 'Category', id: string, name: string }, comments?: Array<{ __typename?: 'Comment', id: string, body: string, createdBy: string }> | null | undefined }> | null | undefined } };


export const ActivateAccountDocument = gql`
    mutation ActivateAccount($token: String!) {
  activateAccount(token: $token)
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
    messages
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
export const CreatePostDocument = gql`
    mutation CreatePost($userId: ID!, $categoryId: ID!, $title: String!, $body: String!, $postType: String!) {
  createPost(
    userId: $userId
    categoryId: $categoryId
    title: $title
    body: $body
    postType: $postType
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
 *      categoryId: // value for 'categoryId'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      postType: // value for 'postType'
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
export const UpdatePostPointMutationDocument = gql`
    mutation UpdatePostPointMutation($postId: ID!, $increment: Boolean!) {
  updatePostPoint(postId: $postId, increment: $increment)
}
    `;
export type UpdatePostPointMutationMutationFn = Apollo.MutationFunction<UpdatePostPointMutationMutation, UpdatePostPointMutationMutationVariables>;

/**
 * __useUpdatePostPointMutationMutation__
 *
 * To run a mutation, you first call `useUpdatePostPointMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostPointMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostPointMutationMutation, { data, loading, error }] = useUpdatePostPointMutationMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      increment: // value for 'increment'
 *   },
 * });
 */
export function useUpdatePostPointMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostPointMutationMutation, UpdatePostPointMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostPointMutationMutation, UpdatePostPointMutationMutationVariables>(UpdatePostPointMutationDocument, options);
      }
export type UpdatePostPointMutationMutationHookResult = ReturnType<typeof useUpdatePostPointMutationMutation>;
export type UpdatePostPointMutationMutationResult = Apollo.MutationResult<UpdatePostPointMutationMutation>;
export type UpdatePostPointMutationMutationOptions = Apollo.BaseMutationOptions<UpdatePostPointMutationMutation, UpdatePostPointMutationMutationVariables>;
export const GetCommentsByPostIdDocument = gql`
    query GetCommentsByPostId($postId: ID!) {
  getCommentsByPostId(postId: $postId) {
    ... on CommentArray {
      comments {
        id
        body
        isDisabled
        user {
          username
          id
        }
        createdOn
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
        postType
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
        title
        body
        postType
        creator {
          username
        }
        isDisabled
        category {
          id
          name
        }
        createdOn
        comments {
          id
          body
          createdBy
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