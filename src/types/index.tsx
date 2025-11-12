import type { ReactNode } from "react";

export interface TemplateProps {
	children: ReactNode
}

export interface TUserContext {
	user_name: string;
	image_url: string;
}

export interface Post {
  id: number;
  userId: number;
  link: string;
  description: string;
  user: {
    id: number;
    name: string;
    image_url: string;
  };
  createdAt: string;
}

export interface TMetaData {
  title: string;
  description: string;
  images: string;
  url: string;
}

export interface TResponseMetaData {
  data: TMetaData
}
