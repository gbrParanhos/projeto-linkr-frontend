import classNames from "classnames";

interface MenuDropdownProps {
  isMenuOpen: boolean;
  Buttons: React.ReactNode;
}

export default function MenuDropdown({ isMenuOpen, Buttons }: MenuDropdownProps) {
  const styles = {
		menu: {
			base: 'fixed flex flex-col h-20 bottom-[67px] right-3 gap-1 transition-all duration-300 ease-in-out',
			lg: 'lg:bottom-auto lg:right-1.5 lg:top-[84px] lg:flex-col-reverse',
			open: 'translate-y-0 opacity-100 lg:-translate-y-0',
			closed: 'translate-y-4 opacity-0 pointer-events-none lg:-translate-y-4'
		}
	};

  return (
    <div className={classNames(
      styles.menu.base, 
      styles.menu.lg,
      isMenuOpen ? styles.menu.open : styles.menu.closed
    )}>
      {Buttons}
    </div>
  );
}