import classNames from 'classnames';

const NavBar = () => {
	const styles = {
		base: 'fixed bottom-0 left-3 right-3 mb-2 flex h-14 rounded-2xl bg-[#151515]',
		md: 'md:bottom-auto md:left-auto md:right-auto md:top-0 md:h-20 md:w-dvw md:rounded-none'
	};

	return (
		<div className={classNames(styles.base, styles.md)}>
		</div>
	);
};

export default NavBar;