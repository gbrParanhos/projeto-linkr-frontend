import classNames from 'classnames';
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import MenuDropdown from '../../molecules/MenuDropdown';
import MenuButton from '../../atoms/MenuButton';
import AvatarButton from '../../molecules/AvatarButton';

const NavBar = () => {
	const { image_url } = useContext(UserContext);
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);

	const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate("/");
  };

	const styles = {
		container: {
			base: 'fixed bottom-0 left-3 right-3 px-6 mb-2 flex h-14 rounded-2xl bg-[#151515] justify-between items-center z-50 shadow-[0px_0px_10px_0px_#484848]',
			lg: 'lg:mb-0 lg:bottom-auto lg:px-3.5 lg:left-auto lg:right-auto lg:top-0 lg:h-20 lg:w-dvw lg:rounded-none lg:shadow-none'
		},
		text_title: {
			base: 'font-passion font-bold text-white text-[28px] tracking-wide',
			lg: 'lg:text-[49px]'
		}
	};

	return (
		<div className={classNames(styles.container.base, styles.container.lg)}>
			<h1 className={classNames(styles.text_title.base, styles.text_title.lg)}>
				Linkr
			</h1>
			<AvatarButton onClick={() => setIsMenuOpen(prevState => !prevState)} image_url={image_url} />
			<MenuDropdown
				isMenuOpen={isMenuOpen}
				Buttons={<>
					<MenuButton
						onClick={onLogout}
						text="Sair"
					/>
					<MenuButton
						onClick={() => {}}
						text="Meu Perfil"
					/>
				</>}
			/>
		</div>
	);
};

export default NavBar;