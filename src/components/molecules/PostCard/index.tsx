import { Card, CardContent } from "../../atoms/Card";
import { Button } from "../../atoms/Button";
import DefaultInput from "../../atoms/DefaultInput";
import { cn } from "../../../lib/utils";
import type { ReactNode } from "react";


interface PostCardProps {
  avatarUrl?: string;
  title?: string;
  link?: string;
  description?: string;
  onLinkChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonLabel?: string;
  readOnly?: boolean;
  footerSlot?: ReactNode;
}

export function PostCard({
  avatarUrl,
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
}: PostCardProps) {
  return (
    <Card
      className={cn(
        "w-[615px] h-[209px] bg-white rounded-[16px] shadow-md font-lato",
        "flex gap-[18px] px-[18px] py-[16px] items-start"
      )}
    >
      {/* Avatar */}
      <div className="mt-[4px]">
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt="User avatar"
          className="
            w-[48.96px] h-[50px] 
            rounded-[26.5px] object-cover
          "
        />
      </div>

      <CardContent className="flex flex-col flex-1 p-0">
        {!readOnly ? (
          <>
            <h2 className="text-[#707070] text-[20px] mb-[13px] leading-[24px]">
              {title}
            </h2>

            <DefaultInput
              type="url"
              placeholder="http://..."
              value={link}
              onChange={(e) => onLinkChange?.(e.target.value)}
              disabled={disabled}
              className="
                bg-[#EFEFEF] text-[#707070] text-[15px]
                w-[506.3px] h-[30px]
                mb-[8px] px-[10px] rounded-[5px] border-none
                placeholder:text-[#9F9F9F]
              "
            />

            <textarea
              placeholder="Muito maneiro esse link falando de #javascript"
              value={description}
              onChange={(e) => onDescriptionChange?.(e.target.value)}
              disabled={disabled}
              rows={3}
              className="
                bg-[#EFEFEF] text-[#707070] text-[15px]
                w-[505.3px] h-[66px]
                p-[8px] rounded-[5px] resize-none mb-[10px]
                outline-none placeholder:text-[#9F9F9F]
              "
            />

            <div className="flex justify-end mt-[3px]">
              <Button
                onClick={onSubmit}
                disabled={disabled || !link.trim()}
                className="
                  bg-[#1877F2] hover:bg-[#166fe0]
                  text-white font-bold text-[14px]
                  w-[112.73px] h-[31px]
                  rounded-[5px] transition-all disabled:opacity-70
                "
              >
                {loading ? "Publicando..." : buttonLabel}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {description && (
              <p className="text-[#707070] text-[15px]">{description}</p>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] text-[15px] underline break-words"
              >
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