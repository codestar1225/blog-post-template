// publish blog
export type PublishSuccessRes = {
  message: string;
  status: number;
};

export type PublishErrorRes = {
  message: string;
  status: number;
};
// get blogs
export type BlogType = {
  _id: string;
  userName: string;
  userId: string;
  title: string;
  desc: string;
  tags: string[];
  time: Date;
};
export type GetBlogsSuccessRes = {
  blogs: BlogType[];
  userId: string;
  message: string;
  status: number;
};

export type GetBlogsErrorRes = {
  message: string;
  status: number;
};

//get blog
export type GetBlogSuccessRes = {
  blog: BlogType;
  message: string;
  status: number;
};

export type GetBlogErrorRes = {
  message: string;
  status: number;
};

//edit blog
export type EditBlogSuccessRes = {
  message: string;
  status: number;
};

export type EditBlogErrorRes = {
  message: string;
  status: number;
};
