export interface Post {
  id: string,
  userId: string,
  userName: string,
  content: string,
  userAvatar: string,
  image?: string,
  likes: string[],
  commentCount: number,
  createdAt: Date,
  updatedAt: Date
}

export interface CreatePost {
  content: string,
  image?: string
}

export interface UpdatePost {
  content?: string,
  image?: string
}