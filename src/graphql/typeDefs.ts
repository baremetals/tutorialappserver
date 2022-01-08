import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  scalar Upload

  type EntityResult {
    messages: [String!]
  }

  type User {
    id: ID!
    userIdSlug: String
    role: String!
    email: String!
    username: String!
    fullName: String!
    password: String!
    confirmed: Boolean!
    description: String!
    location: String!
    isDisabled: Boolean!
    isOnline: Boolean!
    profileImage: String!
    backgroundImg: String!
    posts: [Post!]
    comments: [Comment!]
    courses: [Course!]
    videos: [Video!]
    books: [Book!]
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

  type Support {
    id: ID!
    fullName: String!
    username: String!
    email: String!
    subject: String!
    body: String!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union SupportResult = Support | EntityResult
  type SupportArray {
    supports: [Support!]
  }
  union SupportArrayResult = SupportArray | EntityResult

  type Post {
    id: ID!
    slug: String!
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
    lastModifiedBy: String!
    lastModifiedOn: Date!
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
    slug: String!
    title: String!
    duration: String!
    description: String!
    notes: String!
    githubLink: String!
    image: String!
    startDate: String!
    endDate: String!
    totalStudents: Int!
    lessons: Int!
    teacher: User!
    students: [Student!]
    videos: [Video!]
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

  type Video {
    id: ID!
    isDisabled: Boolean!
    title: String!
    url: String
    description: String!
    teacher: User!
    course: Course!
    createdBy: String!
    createdOn: Date!
    lastModifiedBy: String!
    lastModifiedOn: Date!
  }
  union VideoResult = Video | EntityResult
  type VideoArray {
    videos: [Video!]
  }
  union VideoArrayResult = VideoArray | EntityResult

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

  # Search types
  type SearchArray {
    users: [User!]
    posts: [Post!]
    courses: [Course!]
  }
  # union SearchArrayResult = SearchArray | EntityResult
  union SearchArrayResult = SearchArray | EntityResult

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  # Query types
  type Query {
    # Users Query
    me: UserResult!
    getUserBySlugId(userIdSlug: String!): UserResult
    searchUsers(searchItem: String!): UserArrayResult!

    uploads: [File]

    # Post Query
    getPostBySlug(slug: String!): PostResult
    getPostsByCategoryId(categoryId: ID!): PostArrayResult!
    getAllCategories: [Category!]
    getLatestPosts: PostArrayResult!
    getTopCategoryPost: [CategoryPost!]

    # Comment Query
    getCommentsByPostSlug(slug: String!): CommentArrayResult!

    # Course Query
    getCourseBySlug(slug: String!): CourseResult!
    getLatestCourses: CourseArrayResult!
    getCoursesByCategoryId(categoryId: ID!): CourseArrayResult!
    getStudentsByCourseId(courseId: ID!): StudentArrayResult!

    # Book Query
    getBooks: BookArrayResult!
    getBooksByCategoryId(categoryId: ID!): BookArrayResult!

    # Notification Query
    getMessagesByUserId: MessageArrayResult!
    getUnReadMessagesByUserId: MessageArrayResult!

    # Video Query
    getVideosByCourseId(courseId: ID!): VideoArrayResult!

    # Chat Query
    getAllChatsByUserId: ChatArrayResult!
    getAllChats: ChatArrayResult!
    getChatMessagesByChatId(chatId: ID!): ChatMsgArrayResult!
    getAllChatMsgs: ChatMsgArrayResult!
    getAllUnReadChatMsgsByUserId: ChatMsgArrayResult!
    searchAllChatsByUserId(username: String!): ChatMsgArrayResult!

    # Search Query
    searchUsersBySearchTerm(searchItem: String!): UserArrayResult!
    searchPostsBySearchTerm(searchItem: String!): PostArrayResult!
    searchCoursesBySearchTerm(searchItem: String!): CourseArrayResult!
    searchBySearchTerm(searchItem: String!): SearchArrayResult!
  }

  # Mutation types
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
    activateAccount(token: String!): String!
    forgotPassword(usernameOrEmail: String!): String!
    resetPassword(token: String!, newPassword: String!): String!
    editMe(
      email: String!
      username: String!
      fullName: String!
      description: String!
      location: String!
    ): String!
    editProfileImage(file: Upload!): String!
    editBackGroundImage(file: Upload!): String!

    deleteMe: String!

    ## Uploads
    uploadFile(file: Upload!, id: ID!): String!

    # Post Mutation
    createPost(
      userId: ID!
      categoryName: String!
      title: String!
      body: String!
    ): EntityResult!

    editPost(
      id: ID!
      title: String!
      body: String!
      categoryName: String!
    ): EntityResult!
    deletePost(id: ID!): String!

    # Comment Mutation
    createComment(userId: ID!, slug: String!, body: String): CommentResult!
    editComment(id: ID!, body: String!): EntityResult!
    deleteComment(id: ID!): String!

    # Likes Mutation
    updatePostPoint(slug: String!, increment: Boolean!): String!

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

    editCourse(
      id: ID!
      title: String!
      duration: String!
      description: String!
      image: String!
      startDate: String!
      endDate: String!
      categoryId: String!
    ): EntityResult!
    deleteCourse(id: ID!): String!
    joinOrLeaveCourse(courseId: ID!, join: Boolean!): String!

    markMessageRead(id: ID!): String!
    markAllMessagesReadByUserId(id: ID!): String!
    deleteMessage(id: ID!): String!
    deleteAllMessagesByUserId(id: ID!): String!

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
    editChatMsg(id: ID!, body: String!): ChatMsgResult
    deleteChatMsg(id: ID!): String!
    deleteChat(id: ID!): String!

    # Video Mutation
    newVideo(
      userId: ID!
      courseId: ID!
      title: String!
      description: String!
      url: String!
    ): EntityResult!

    editVideo(
      id: ID!
      description: String!
      title: String!
      url: String!
    ): EntityResult!
    deleteVideo(id: ID!): String!

    # Support Mutation
    createSupportMessage(
      fullName: String!
      email: String!
      body: String!
      subject: String!
      username: String
    ): EntityResult!
  }

  # Subscription types
  type Subscription {
    newMessage: Message!
    newComment: Comment!
    newChat: Chat!
    newChatMessage: ChatMsg!
  }
`;

export default typeDefs;
