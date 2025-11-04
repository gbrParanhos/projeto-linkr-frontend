import { Input as InputBase } from "../ui/input";
import type { ComponentProps } from "react";


type Props = ComponentProps<typeof InputBase> & { label?: string };


export default function Input({ label, className = "", ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-lato text-white/90 text-sm pl-1">{label}</label>
      )}
      <InputBase
        {...rest}
        className={
          "flex items-center font-oswald font-bold text-[22px] sm:text-[26px] lg:text-[30px] " +
          "leading-[56px] sm:leading-[64px] lg:leading-[70px] tracking-[0em] text-[#9F9F9F] " +
          "bg-white border-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
          "h-[56px] sm:h-[64px] lg:h-[70px] px-5 placeholder:text-[#9F9F9F] " +
          "placeholder:text-[22px] sm:placeholder:text-[26px] lg:placeholder:text-[30px] " +
          className
        }
      />
    </div>
  );
}