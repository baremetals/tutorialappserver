import { gql } from "apollo-server-express";


const typeDefs = gql`
  scalar Date

  type EntityResult {
    messages: [String!]
  }

  type User {
    id: ID!
    email: String!
    username: String!
    fullName: String!
    password: String!
    confirmed: Boolean!
    # isAdmin: Boolean!
    isDisabled: Boolean!
    profileImage: String!
    backgroundImg: String!
    posts: [Post!]
    groups: [Group!]
    comments: [Comment!]
    # courses: [Course!]
    # courseNotes: [CourseNote!]
    # books: [Book!]
    # recommendations: [Recommendation!]
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union UserResult = User | EntityResult

  type Group {
    id: ID!
    name: String!
    codename: String!
    permissions: [Permission!]
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  type Permission {
    id: ID!
    name: String!
    codename: String!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  type Post {
    id: ID!
    views: Int!
    likes: Int!
    isDisabled: Boolean!
    title: String!
    body: String!
    postType: String!
    user: User!
    comments: [Comment!]
    category: PostCategory!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union PostResult = Post | EntityResult
  type PostArray {
    posts: [Post!]
  }
  union PostArrayResult = PostArray | EntityResult

  type Comment {
    id: ID!
    views: Int!
    isDisabled: Boolean!
    body: String!
    user: User!
    post: Post!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union CommentResult = Comment | EntityResult
  type CommentArray {
    comments: [Comment!]
  }
  union CommentArrayResult = CommentArray | EntityResult

  type PostCategory {
    id: ID!
    name: String!
    description: String
    posts: [Post!]!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  type Like {
    id: ID!
    isDecrement: Boolean!
    user: User!
    post: Post!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  type CategoryPost {
    postId: ID!
    categoryId: ID!
    categoryName: String!
    title: String!
    titleCreatedOn: Date!
  }

  type Query {
    # Users Query
    me: UserResult!

    # Post Query
    getPostById(id: ID!): PostResult
    getPostsByCategoryId(categoryId: ID!): PostArrayResult!
    getAllCategories: [PostCategory!]
    getLatestPosts: PostArrayResult!
    getTopCategoryPost: [CategoryPost!]

    # Comment Query
    getCommentsByPostId(postId: ID!): CommentArrayResult!
  }

  type Mutation {
    # Users Mutation
    register(
      email: String!
      username: String!
      fullName: String!
      password: String!
    ): String!
    login(usernameOrEmail: String!, password: String!): String!
    logout(userName: String!): String!
    changePassword(newPassword: String!): String!
    activateAccount(token: String!): String!
    forgotPassword(usernameOrEmail: String!): String!
    resetPassword(token: String!, newPassword: String!): String!

    # Post Mutation
    createPost(
      userId: ID!
      categoryId: ID!
      title: String!
      body: String!
    ): EntityResult

    # Comment Mutation
    createComment(userId: ID!, postId: ID!, body: String): EntityResult

    # Likes Mutation
    updateLike(postId: ID!, increment: Boolean!): String!
  }
`;

export default typeDefs;