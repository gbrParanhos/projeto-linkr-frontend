/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

interface PostBoxContextType {
  isPostBoxOpen: boolean;
  setIsPostBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostBoxContext = createContext<PostBoxContextType>({
  isPostBoxOpen: false,
  setIsPostBoxOpen: () => {},
});

export const usePostBox = () => useContext(PostBoxContext);

export default PostBoxContext;
