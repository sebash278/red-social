export interface Comment {
  id: string,
  postId: string,
  userId: string,
  username: string,
  userAvatar?: string,
  content: string,
  likes: string,
  createdAt: Date,
  updatedAt: Date
}

export interface CreateComment {
  postId: string,
  content: string
}

export interface UpdateComment {
  content: string
}