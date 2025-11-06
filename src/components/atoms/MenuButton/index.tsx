import classNames from "classnames";

interface MenuButtonProps {
  onClick: () => void;
  text: string;
}

export default function MenuButton({ onClick, text }: MenuButtonProps) {
	const styles = {
		menu_button: {
			base: 'bg-[#151515] w-32 h-10 rounded-2xl',
			lg: 'w-[106px] rounded-md'
		},
		text_button: {
			base: 'font-lato font-bold tracking-wide text-lg text-white',
			lg: 'lg:text-base'
		}
	};

  return (
    <button
      className={classNames(styles.menu_button.base, styles.menu_button.lg, styles.text_button.base, styles.text_button.lg)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}