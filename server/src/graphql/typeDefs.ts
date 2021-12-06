import { gql } from "apollo-server-express";


const typeDefs = gql`
  scalar Date

  type EntityResult {
    messages: [String!]
  }

  type User {
    id: ID!
    userIdSlug: String
    email: String!
    username: String!
    fullName: String!
    password: String!
    confirmed: Boolean!
    # isAdmin: Boolean!
    isDisabled: Boolean!
    isOnline: Boolean!
    profileImage: String!
    backgroundImg: String!
    posts: [Post!]
    groups: [Group!]
    comments: [Comment!]
    courses: [Course!]
    notes: [Note!]
    books: [Book!]
    # recommendations: [Recommendation!]
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union UserResult = User | EntityResult
  type UserArray {
    users: [User!]
  }
  union UserArrayResult = UserArray | EntityResult

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
    points: Int!
    isDisabled: Boolean!
    title: String!
    body: String!
    creator: User!
    comments: [Comment!]
    postPoints: [PostPoint!]
    category: Category!
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
    isDisabled: Boolean!
    body: String!
    user: User!
    # post: Post!
    createdBy: String!
    createdOn: Date!
    # lastModifiedBy: String!
    # lastModifiedOn: Date!
  }
  union CommentResult = Comment | EntityResult

  type CommentArray {
    comments: [Comment!]
  }
  union CommentArrayResult = CommentArray | EntityResult

  type Category {
    id: ID!
    name: String!
    description: String
    posts: [Post!]!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  type PostPoint {
    id: ID!
    isDecrement: Boolean!
    user: User!
    post: Post!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  union PostPointResult = PostPoint | EntityResult

  type PostPointArray {
    postPoints: [PostPoint!]
  }
  union PostPointArrayResult = PostPointArray | EntityResult

  type CategoryPost {
    postId: ID!
    categoryId: ID!
    categoryName: String!
    title: String!
    titleCreatedOn: Date!
  }

  type Course {
    id: ID!
    title: String!
    duration: String!
    description: String!
    image: String!
    startDate: String!
    endDate: String!
    totalStudents: Int!
    teacher: User!
    students: [Student!]
    category: Category!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  union CourseResult = Course | EntityResult

  type CourseArray {
    courses: [Course!]
  }
  union CourseArrayResult = CourseArray | EntityResult

  type Student {
    id: ID!
    user: User!
    course: Course!
    hasJoined: Boolean!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }

  type StudentArray {
    students: [User!]
  }

  union StudentArrayResult = StudentArray | EntityResult

  type Note {
    id: ID!
    isDisabled: Boolean!
    title: String!
    noteType: String
    body: String!
    adminUser: User!
    course: Course!
    comment: [Comment!]
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union NoteResult = Note | EntityResult
  type NoteArray {
    notes: [Note!]
  }
  union NoteArrayResult = NoteArray | EntityResult

  # Book types
  type Book {
    id: ID!
    title: String!
    description: String!
    image: String!
    author: String!
    link: String!
    adminUser: User!
    category: Category!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union BookResult = Book | EntityResult

  type BookArray {
    books: [Book!]
  }
  union BookArrayResult = BookArray | EntityResult

  # Message types
  type Message {
    id: ID!
    from: String!
    image: String!
    isRead: Boolean!
    title: String!
    body: String!
    type: String!
    user: User!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union MsgResult = Message | EntityResult
  type MessageArray {
    msgs: [Message!]
  }
  union MessageArrayResult = MessageArray | EntityResult

  # Chat types
  type ChatMsg {
    id: ID!
    isRead: Boolean!
    body: String!
    sender: User!
    receiver: User!
    chat: Chat!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union ChatMsgResult = ChatMsg | EntityResult
  type ChatMsgArray {
    chatMsgs: [ChatMsg!]
  }
  union ChatMsgArrayResult = ChatMsgArray | EntityResult

  # Chat types
  type Chat {
    id: ID!
    owner: User!
    recipient: User!
    chatMsgs: [ChatMsg!]
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union ChatResult = Chat | EntityResult
  type ChatArray {
    chats: [Chat!]
  }
  union ChatArrayResult = ChatArray | EntityResult

  # Query types
  type Query {
    # Users Query
    me: UserResult!
    getUserBySlugId(userIdSlug: String!): UserResult
    searchUsers(searchItem: String!): UserArrayResult!

    # Post Query
    getPostById(id: ID!): PostResult
    getPostsByCategoryId(categoryId: ID!): PostArrayResult!
    getAllCategories: [Category!]
    getLatestPosts: PostArrayResult!
    getTopCategoryPost: [CategoryPost!]

    # Comment Query
    getCommentsByPostId(postId: ID!): CommentArrayResult!
    getCommentsByCourseId(courseId: ID!): CommentArrayResult!
    getCommentsByNoteId(noteId: ID!): CommentArrayResult!

    # Course Query
    getCourseById(id: ID!): CourseResult!
    getLatestCourses: CourseArrayResult!
    getCoursesByCategoryId(categoryId: ID!): CourseArrayResult!
    getStudentsByCourseId(courseId: ID!): StudentArrayResult!

    # Book Query
    getBooks: BookArrayResult!
    getBooksByCategoryId(categoryId: ID!): BookArrayResult!

    # Notification Query
    getMessagesByUserId: MessageArrayResult!
    getUnReadMessagesByUserId: MessageArrayResult!

    # Note Query
    getNotesByCourseId(courseId: ID!): NoteArrayResult!

    # Chat Query
    getAllChatsByUserId: ChatArrayResult!
    getAllChats: ChatArrayResult!
    getChatMessagesByChatId(chatId: ID!): ChatMsgArrayResult!
    getAllChatMsgs: ChatMsgArrayResult!
    getAllUnReadChatMsgsByUserId: ChatMsgArrayResult!
    searchAllChatsByUserId(username: String): ChatMsgArrayResult!
  }

  # Mutatiob types
  type Mutation {
    # Users Mutation
    register(
      email: String!
      username: String!
      fullName: String!
      password: String!
    ): String!
    login(usernameOrEmail: String!, password: String!): String!
    logout(username: String!): String!
    changePassword(currentPassword: String!, newPassword: String!): String!
    activateAccount(token: String!): MsgResult!
    forgotPassword(usernameOrEmail: String!): String!
    resetPassword(token: String!, newPassword: String!): String!
    editMe(email: String!, username: String!, fullName: String!): String!
    editProfileImage(profileImage: String!): String!
    editBackGroundImage(backgroundImg: String!): String!

    deleteMe: String!

    # Post Mutation
    createPost(
      userId: ID!
      categoryName: String!
      title: String!
      body: String!
    ): EntityResult!

    # Comment Mutation
    createComment(userId: ID!, postId: ID!, body: String): CommentResult!
    newCourseComment(userId: ID!, courseId: ID!, body: String): EntityResult!
    newNoteComment(userId: ID!, noteId: ID!, body: String): EntityResult!

    # Likes Mutation
    updatePostPoint(postId: ID!, increment: Boolean!): String!

    # Course Mutation
    createCourse(
      userId: ID!
      categoryId: ID!
      title: String!
      duration: String!
      description: String!
      image: String!
      startDate: String!
      endDate: String!
      group: String!
    ): EntityResult!
    joinOrLeaveCourse(courseId: ID!, join: Boolean!): String!

    # Book Mutation
    addABook(
      userId: ID!
      categoryId: ID!
      title: String!
      description: String!
      image: String!
      link: String!
      author: String!
      group: String!
    ): EntityResult!

    # Chat Mutation
    createChatMessage(
      ownerUserId: String!
      username: String!
      body: String!
    ): ChatMsgResult

    # ChatMessage  Mutation
    respondToChatMessage(
      senderUserId: String!
      chatId: String!
      body: String!
    ): ChatMsgResult

    # Note Mutation
    newNote(
      userId: ID!
      courseId: ID!
      title: String!
      body: String!
      noteType: String!
    ): EntityResult!
  }

  # Subscription types
  type Subscription {
    accountActivated: Message!
    newMessage: Message!
    newComment: Comment!
    newChat: Chat!
    newChatMessage: ChatMsg!
  }
`;

export default typeDefs;