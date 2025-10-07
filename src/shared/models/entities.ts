export interface User {
  id?: number;
  email: string;
  displayName: string;
  password?: string;
  role?: string;
  pictures?: Picture[];
  comments?: Comment[];
  favourites?: Picture[];
}

export interface Picture {
  id: number;
  image: string;
  description: string;
  title: string;
  createdAt: string;
  comments?: Comment[];
  author: User;
  likes?: User[];
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  picture?: Picture;
  author: User;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size?: number;
  number?: number;
}
