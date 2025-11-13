import { Card, CardContent } from "../../atoms/Card";
import { Button } from "../../atoms/Button";
import DefaultInput from "../../atoms/DefaultInput";
import { useContext, type ReactNode } from "react";
import UserContext from "../../../contexts/UserContext";
import Avatar from "../../atoms/Avatar";

interface PostCardProps {
  avatarUrl?: string;
  title?: string;
  link?: string;
  description?: string;
  onLinkChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onSubmit?: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  buttonLabel?: string;
  readOnly?: boolean;
  footerSlot?: ReactNode;
  variant?: "desktop" | "mobile";
  topRightSlot?: ReactNode;
}

export function NewPostCard({
  title = "O que você tem pra compartilhar hoje?",
  link = "",
  description = "",
  onLinkChange,
  onDescriptionChange,
  onSubmit,
  disabled = false,
  loading = false,
  buttonLabel = "Publicar",
  readOnly = false,
  footerSlot,
  variant = "desktop",
  topRightSlot,
}: PostCardProps) {
  const { image_url } = useContext(UserContext);

  const containerClass =
    variant === "desktop"
      ? "w-[615px] h-[209px] bg-white rounded-2xl shadow-md font-lato flex-row gap-[18px] px-[18px] py-4 items-start hidden lg:flex relative"
      : "w-full bg-white rounded-t-2xl shadow-md font-lato flex flex-col items-center gap-3 px-4 py-4 lg:hidden relative";

  const titleClass =
    variant === "desktop"
      ? "text-[#707070] text-[20px] mb-[13px] leading-6 text-left w-full"
      : "font-lato font-light text-[17px] leading-[1] text-center w-[285px] h-[20px] mx-auto text-[#707070]";

  const inputClass =
    variant === "desktop"
      ? "bg-[#D9D9D9] text-[#707070] text-[15px] w-[506.3px] h-[30px] mb-2 px-2.5 rounded-[5px] border-none placeholder:text-[#9F9F9F]"
      : "bg-[#D9D9D9] text-[#707070] text-[15px] w-full max-w-[353px] h-[36px] mb-2 px-3 rounded-[8px] border-none placeholder:text-[#9F9F9F]";

  const textareaClass =
    variant === "desktop"
      ? "bg-[#D9D9D9] text-[#707070] text-[15px] w-[505.3px] h-[66px] p-2 rounded-[5px] resize-none mb-2.5 outline-none placeholder:text-[#9F9F9F]"
      : "bg-[#D9D9D9] text-[#707070] text-[15px] w-full max-w-[353px] h-[90px] p-3 rounded-[8px] resize-none mb-2 outline-none placeholder:text-[#9F9F9F]";

  const buttonWrapperClass =
    variant === "desktop"
      ? "flex justify-end mr-1 w-full"
      : "flex justify-between w-full max-w-[353px] h-[33px] px-1";

  const buttonClass =
    variant === "desktop"
      ? "bg-[#1877F2] hover:bg-[#166fe0] text-white font-bold text-[14px] w-[112.73px] h-[31px] rounded-[5px] transition-all disabled:opacity-70"
      : "bg-[#1877F2] hover:bg-[#166fe0] text-white font-bold text-[16px] w-full h-full rounded-[10px] transition-all disabled:opacity-70";

  return (
    <Card className={containerClass}>
      {variant === "desktop" && topRightSlot && <div className="absolute right-4 top-3">{topRightSlot}</div>}
      {variant === "desktop" && <div className="rounded-full z-10 overflow-hidden flex items-center justify-center bg-white lg:w-[50px] lg:h-[50px]"><Avatar image_url={image_url} size={50} /></div>}

      <CardContent className={variant === "desktop" ? "flex flex-col flex-1 p-0" : "flex flex-col items-center p-0 w-full"}>
        {variant === "mobile" && topRightSlot && <div className="w-full max-w-[353px] flex justify-end pt-1 pb-1">{topRightSlot}</div>}

        {!readOnly ? (
          <>
            <h2 className={titleClass}>{title}</h2>

            <DefaultInput
              type="url"
              placeholder="http://..."
              value={link}
              onChange={(e) => onLinkChange?.(e.target.value)}
              disabled={disabled}
              className={inputClass}
            />

            <textarea
              placeholder="Um artigo incrível sobre #javascript"
              value={description}
              onChange={(e) => onDescriptionChange?.(e.target.value)}
              disabled={disabled}
              rows={variant === "desktop" ? 3 : 5}
              className={textareaClass}
            />

            <div className={buttonWrapperClass}>
              <Button onClick={onSubmit} disabled={disabled || !link.trim()} className={buttonClass}>
                {loading ? (buttonLabel === "Postar" ? "Postando..." : "Publicando...") : buttonLabel}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full max-w-[353px]">
            {description && <p className="text-[#707070] text-[15px]">{description}</p>}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] text-[15px] underline wrap-break-word">
                {link}
              </a>
            )}
            {footerSlot && <div className="mt-3">{footerSlot}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
