export class PostCategory {
  constructor(
    public postId: string,
    public categoryId: string,
    public categoryName: string,
    public title: string,
    public titleCreatedOn: Date
  ) {}
}

export class CourseCategory {
  constructor(
    public courseId: string,
    public categoryId: string,
    public categoryName: string,
    public title: string,
    public titleCreatedOn: Date
  ) {}
}

export class BookCategory {
  constructor(
    public bookId: string,
    public categoryId: string,
    public categoryName: string,
    public title: string,
    public titleCreatedOn: Date
  ) {}
}

export class RecommendationCategory {
  constructor(
    public recommendationId: string,
    public categoryId: string,
    public categoryName: string,
    public title: string,
    public titleCreatedOn: Date
  ) {}
}