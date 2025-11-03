import type { LayoutProps } from "../../../types";

const DefaultLayout = ({ children }: LayoutProps) => {
	return (
		<div className='flex h-dvh w-dvw items-center justify-center'>
			{children}
		</div>
	);
};

export default DefaultLayout;