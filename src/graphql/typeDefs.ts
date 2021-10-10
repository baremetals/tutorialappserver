import { gql } from "apollo-server-express";


const typeDefs = gql`
  scalar Date

  type EntityResult {
    messages: [String!]
  }

  type User {
    id: ID!
    email: String!
    userName: String!
    password: String!
    confirmed: Boolean!
    isAdmin: Boolean!
    isDisabled: Boolean!
    posts: [Post!]
    comments: [Comment!]
    courses: [Course!]
    courseNotes: [CourseNote!]
    books: [Book!]
    recommendations: [Recommendation!]
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union UserResult = User | EntityResult

  type Post {
    id: ID!
    views: Int!
    likes: Int!
    isDisabled: Boolean!
    title: String!
    body: String!
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

  type Query {
    getPostById(id: ID!): PostResult
  }
`;

export default typeDefs;