import { useEffect } from "react";
import type { LayoutProps } from "../../../types";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }: LayoutProps) => {
	const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      navigate("/feed");
    }
  }, [ navigate ]);

	return (
		<div className='flex h-dvh w-dvw items-center justify-center'>
			{children}
		</div>
	);
};

export default AuthLayout;