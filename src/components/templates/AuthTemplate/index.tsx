import { useEffect, useState } from "react";
import type { TemplateProps } from "../../../types";
import { useNavigate } from "react-router-dom";
import Hero from "../../atoms/Hero";

const AuthTemplate = ({ children }: TemplateProps) => {
	const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      navigate("/feed");
    } else {
      setIsLoading(false);
    }
  }, [ navigate ]);

	return (
    <>
      {!isLoading && (
        <div className='flex h-dvh w-dvw items-center justify-center'>
          <main className="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden">
            <section className="flex-1 bg-black text-white flex flex-col justify-center items-start px-8 sm:px-10 lg:px-20 py-12 lg:py-16 text-left">
              <Hero />
            </section>
            <section className="flex-1 bg-[#333333] flex items-center justify-center p-6 sm:p-8">
              {children}
            </section>
          </main>
        </div>
      )}
    </>
	);
};

export default AuthTemplate;