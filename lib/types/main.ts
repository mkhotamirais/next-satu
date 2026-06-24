export interface IPostMeta {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  tags?: string[];
}

export interface IPost {
  slug: string;
  meta: IPostMeta;
  content: string;
}
