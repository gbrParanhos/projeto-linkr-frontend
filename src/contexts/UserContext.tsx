import { createContext } from "react";
import type { TUserContext, TemplateProps } from "../types";

const initialValue: TUserContext = {
  user_name: "",
  image_url: ""
};

const UserContext = createContext<TUserContext>(initialValue);

export const UserProvider = ({ children }: TemplateProps) => {
  const userData = localStorage.getItem("user_data");

  return (
    <UserContext.Provider value={JSON.parse(userData || "{}")}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;