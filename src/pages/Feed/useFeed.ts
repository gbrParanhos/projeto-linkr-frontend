import { useNavigate } from "react-router-dom";

export function useFeed() {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return {
    onLogout
  };
}
