import { useEffect } from "react";
import type { TemplateProps } from "../../../types";
import { useNavigate } from "react-router-dom";
import NavBar from "../../organisms/NavBar";

const SessionTemplate = ({ children }: TemplateProps) => {
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

export default SessionTemplate;