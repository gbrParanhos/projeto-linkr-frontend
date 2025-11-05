import type { ReactNode } from "react";

export interface TemplateProps {
	children: ReactNode
}

export interface TUserContext {
	user_name: string;
	image_url: string;
}
