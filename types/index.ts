export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  images: string[]; // Array de URLs o base64 de imágenes
  isPublic: boolean;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
