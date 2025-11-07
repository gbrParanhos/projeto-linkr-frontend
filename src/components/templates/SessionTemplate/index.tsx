import { useEffect, useState } from "react";
import type { TemplateProps } from "../../../types";
import { useNavigate } from "react-router-dom";
import NavBar from "../../organisms/NavBar";
import { UserProvider } from "../../../contexts/UserContext";

const SessionTemplate = ({ children }: TemplateProps) => {
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [ navigate ]);
  
	return (
    <>
      {!isLoading && (
        <UserProvider>
          <div className='flex flex-col gap-8 bg-[#333333] min-h-dvh max-w-dvw items-center pb-20 lg:pt-28'>
            <NavBar />
            {children}
          </div>
        </UserProvider>
        )
      }
    </>
	);
};

export default SessionTemplate;