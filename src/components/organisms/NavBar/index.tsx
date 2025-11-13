import classNames from "classnames";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import MenuDropdown from "../../molecules/MenuDropdown";
import MenuButton from "../../atoms/MenuButton";
import AvatarButton from "../../molecules/AvatarButton";
import { SquarePen } from "lucide-react";
import PostBoxContext from "../../../contexts/PostBoxContext";

const NavBar = () => {
  const { image_url } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsPostBoxOpen } = useContext(PostBoxContext);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setIsMenuOpen(false);
    navigate("/");
  };

  const onGoToProfile = () => {
    setIsMenuOpen(false);
    navigate("/user/my-profile");
  };

  const styles = {
    container: {
      base: "px-6 w-full flex h-14 rounded-2xl bg-[#151515] justify-between items-center shadow-[0px_0px_10px_0px_#484848]",
      lg: "lg:mb-0 lg:px-3.5 lg:left-auto lg:right-auto lg:h-20 lg:w-dvw lg:rounded-none lg:shadow-none",
    },
    text_title: {
      base: "font-passion font-bold text-white text-[28px] tracking-wide",
      lg: "lg:text-[49px]",
    },
  };

  return (
    <div className="w-screen fixed bottom-2 lg:top-0 lg:bottom-auto px-2 lg:px-0 z-50">
      <div className={classNames(styles.container.base, styles.container.lg)}>
        <h1 className={classNames(styles.text_title.base, styles.text_title.lg)}>Linkr</h1>
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition"
          onClick={() => setIsPostBoxOpen((prevState) => !prevState)}
          aria-label="Criar post"
        >
          <SquarePen className="w-5 h-5 text-white" />
        </button>
        <AvatarButton onClick={() => setIsMenuOpen((prevState) => !prevState)} image_url={image_url} />
        <MenuDropdown
          isMenuOpen={isMenuOpen}
          Buttons={
            <>
              <MenuButton onClick={onLogout} text="Sair" />
              <MenuButton onClick={onGoToProfile} text="Meu Perfil" />
            </>
          }
        />
      </div>
    </div>
  );
};

export default NavBar;
