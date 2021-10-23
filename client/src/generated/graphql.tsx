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
  views: Scalars['Int'];
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

export type Like = {
  __typename?: 'Like';
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDecrement: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  post: Post;
  user: User;
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
  updateLike: Scalars['String'];
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
  userName: Scalars['String'];
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


export type MutationUpdateLikeArgs = {
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
  category: PostCategory;
  comments?: Maybe<Array<Comment>>;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  likes: Scalars['Int'];
  postType: Scalars['String'];
  title: Scalars['String'];
  user: User;
  views: Scalars['Int'];
};

export type PostArray = {
  __typename?: 'PostArray';
  posts?: Maybe<Array<Post>>;
};

export type PostArrayResult = EntityResult | PostArray;

export type PostCategory = {
  __typename?: 'PostCategory';
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  name: Scalars['String'];
  posts: Array<Post>;
};

export type PostResult = EntityResult | Post;

export type Query = {
  __typename?: 'Query';
  getAllCategories?: Maybe<Array<PostCategory>>;
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'EntityResult', messages?: Array<string> | null | undefined } | { __typename?: 'User', email: string, username: string, fullName: string, confirmed: boolean, isDisabled: boolean, profileImage: string, backgroundImg: string, createdOn: any, groups?: Array<{ __typename?: 'Group', codename: string }> | null | undefined, posts?: Array<{ __typename?: 'Post', views: number, likes: number, title: string, body: string, postType: string, comments?: Array<{ __typename?: 'Comment', body: string, createdBy: string, createdOn: any }> | null | undefined }> | null | undefined } };


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
export const MeDocument = gql`
    query Me {
  me {
    ... on EntityResult {
      messages
    }
    ... on User {
      email
      username
      fullName
      confirmed
      isDisabled
      profileImage
      backgroundImg
      createdOn
      groups {
        codename
      }
      posts {
        views
        likes
        title
        body
        postType
        comments {
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