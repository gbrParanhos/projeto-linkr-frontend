import { useEffect, useState } from "react";

interface AvatarProps {
  image_url: string;
  size: number;
  border_size?: number;
}

export default function Avatar({ image_url, size, border_size = 2 }: AvatarProps) {

  const [style, setStyle] = useState(`
    flex items-center justify-center w-[40px] h-[40px] rounded-full overflow-hidden border-0 border-[#333333]
  `);

  useEffect(() => {
    setStyle(`
      flex items-center justify-center w-[${size}px] h-[${size}px] rounded-full overflow-hidden border-[${border_size}px] border-[#333333]
    `);
  }, [size, border_size]);

  return (
      <div className={style}>
        <img width={size} height={size} src={image_url} alt="avatar" />
      </div>

  );
}