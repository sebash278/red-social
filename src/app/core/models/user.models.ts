export interface User {
  id: string,
  username: string,
  email: string,
  password?: string,
  fullname: string,
  bio?: string,
  avatar: string,
  coverPhoto?: string,
  followers: string[],
  following: string[],
  createdAt: Date,
  updatedAt: Date
}

export interface UserRegistration {
  username: string,
  email: string,
  password: string,
  fullname: string
}

export interface UserUpdate {
  fullname?: string,
  bio?: string,
  avatar?: string,
  coverPhoto?: string
}