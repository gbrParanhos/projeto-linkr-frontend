import { useEffect, useState } from "react";
import type { TemplateProps } from "../../../types";
import { useNavigate } from "react-router-dom";
import NavBar from "../../organisms/NavBar";
import { UserProvider } from "../../../contexts/UserContext";
import PostBoxContext from "../../../contexts/PostBoxContext";
// import PostUI from "../../../pages/Feed/postUI";

const SessionTemplate = ({ children }: TemplateProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isPostBoxOpen, setIsPostBoxOpen] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  return (
    <>
      {!isLoading && (
        <UserProvider>
          <PostBoxContext.Provider value={{ isPostBoxOpen, setIsPostBoxOpen }}>
            <div className=" min-h-dvh max-w-dvw flex flex-col gap-8 bg-[#333333] items-center pb-20 lg:pt-28">
              <NavBar />
              {children}
            </div>
          </PostBoxContext.Provider>
        </UserProvider>
      )}
    </>
  );
};

export default SessionTemplate;
