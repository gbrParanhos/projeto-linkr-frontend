import classNames from "classnames";
import type { ComponentProps } from "react";
import DefaultInput from "../../atoms/DefaultInput";


type Props = ComponentProps<typeof DefaultInput> & { label?: string };


export default function AuthInput({ label, className = "", ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-lato text-white/90 text-sm pl-1">{label}</label>
      )}
      <DefaultInput
        {...rest}
        className={classNames(
          "flex items-center font-oswald font-bold text-[22px] sm:text-[26px] lg:text-[30px] ",
          "leading-14 sm:leading-16 lg:leading-18 tracking-[0em] text-[#9F9F9F] ",
          "bg-white border-none focus-visible:ring-2 focus-visible:ring-blue-500 ",
          "h-14 sm:h-16 lg:h-18 px-5 placeholder:text-[#9F9F9F] ",
          "placeholder:text-[22px] sm:placeholder:text-[26px] lg:placeholder:text-[30px] ",
          className
        )}
      />
    </div>
  );
}