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
  link: string;
  description: string;
  username: string;
  image_url: string;
  created_at: string;
}
