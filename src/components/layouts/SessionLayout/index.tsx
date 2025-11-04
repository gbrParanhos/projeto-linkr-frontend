import { useEffect } from "react";
import type { LayoutProps } from "../../../types";
import { useNavigate } from "react-router-dom";
import NavBar from "../../organisms/NavBar";

const SessionLayout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      navigate("/");
    }
  }, [ navigate ]);
  
	return (
		<div className='flex bg-[#333333] h-dvh w-dvw items-center justify-center md:pt-28'>
      <NavBar />
			{children}
		</div>
	);
};

export default SessionLayout;