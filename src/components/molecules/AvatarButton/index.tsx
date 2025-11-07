import classNames from "classnames";
import Avatar from "../../atoms/Avatar";

interface AvatarButtonProps {
  onClick: () => void;
  image_url: string;
}

export default function AvatarButton({ onClick, image_url }: AvatarButtonProps) {
  const styles = {
    desktop: {
      avatar_button: {
        base: 'hidden bg-[#333333] gap-3 items-center p-[5px] rounded-[10px]',
        lg: 'lg:flex'
      },
      image_container: {
        base: 'flex items-center justify-center w-[53px] h-[53px] rounded-[10px] overflow-hidden'
      },
      vector_container: {
        base: 'flex flex-col justify-between h-3 mr-1'
      },
      vector: {
        base: 'bg-white w-[18px] h-0.5 rounded-lg'
      }
    }
  };

  return (
    <>
      <button className='lg:hidden' onClick={onClick}>
        <Avatar image_url={image_url} size={44} border_size={2} />
      </button>
      <button className={classNames(styles.desktop.avatar_button.base, styles.desktop.avatar_button.lg)} onClick={onClick}>
        <div className={classNames(styles.desktop.image_container.base)}>
          <img src={image_url} alt="avatar" />
        </div>
        <div className={classNames(styles.desktop.vector_container.base)}>
          <div className={classNames(styles.desktop.vector.base)} />
          <div className={classNames(styles.desktop.vector.base)} />
          <div className={classNames(styles.desktop.vector.base)} />
        </div>
      </button>
    </>
  );
}