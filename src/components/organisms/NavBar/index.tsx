import classNames from 'classnames';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	const { image_url } = useContext(UserContext);

	const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate("/");
  };

	const styles = {
		container: {
			base: 'fixed bottom-0 left-3 right-3 px-6 mb-2 flex h-14 rounded-2xl bg-[#151515] justify-between items-center',
			lg: 'lg:mb-0 lg:bottom-auto lg:px-3.5 lg:left-auto lg:right-auto lg:top-0 lg:h-20 lg:w-dvw lg:rounded-none'
		},
		text: {
			base: 'font-passion font-bold text-white text-[28px] tracking-wide',
			lg: 'lg:text-[49px]'
		},
		button: {
			base: 'flex items-center justify-center w-11 h-11 rounded-full overflow-hidden',
			lg: ''
		}
	};

	return (
		<div className={classNames(styles.container.base, styles.container.lg)}>
			<h1 className={classNames(styles.text.base, styles.text.lg)}>
				Linkr
			</h1>
			<button className={classNames(styles.button.base, styles.button.lg)} onClick={onLogout}>
				<img src={image_url} alt="avatar" />
			</button>
		</div>
	);
};

export default NavBar;