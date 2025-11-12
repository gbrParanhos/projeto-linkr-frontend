import { useEffect } from "react";
import { NewPostCard } from "../../molecules/NewPostCard";

type Props = {
  open: boolean;
  onClose: () => void;
  link: string;
  description: string;
  onLinkChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onSubmit: () => Promise<void> | void;
  loading?: boolean;
};

export default function MobilePostSheet({
  open,
  onClose,
  link,
  description,
  onLinkChange,
  onDescriptionChange,
  onSubmit,
  loading = false,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Criar post"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Fechar criador de post"
        onClick={onClose}
      />
      <div className="relative z-10 w-full flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+72px)]">
        <NewPostCard
          variant="mobile"
          link={link}
          description={description}
          onLinkChange={onLinkChange}
          onDescriptionChange={onDescriptionChange}
          onSubmit={async () => {
            await onSubmit();
            onClose();
          }}
          disabled={loading}
          loading={loading}
          buttonLabel="Postar"
          topRightSlot={
            <button
              type="button"
              onClick={onClose}
              className="text-[#1877F2] text-[14px] font-semibold"
            >
              Fechar
            </button>
          }
        />
      </div>
    </div>
  );
}
