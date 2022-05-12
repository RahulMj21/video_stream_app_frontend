export interface User {
  name: string;
  email: string;
  role: string;
}
export interface Video {
  videoTitle: string;
  videoDescription: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    avatar: {
      public_id: string;
      secure_url: string;
    };
  };
  extension: string;
  videoId: string;
  published: Boolean;
  createdAt: string;
}
