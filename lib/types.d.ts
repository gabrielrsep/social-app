interface Post {
  id: string;
  content: string;
  createdAt: Date;
  author: Record<'id' | 'name', string>
  _count: {
    votes: number
  }
}