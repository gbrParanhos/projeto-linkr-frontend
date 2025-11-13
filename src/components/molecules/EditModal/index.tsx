import { Dialog, DialogContent, DialogTitle } from "../../atoms/DefaultDialog";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface EditModalProps {
  post: {
    id: number;
    description: string;
    link: string;
  };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: (postId: number, data: { description: string; link: string }) => Promise<boolean>;
}

export default function EditModal({ post, open, setOpen, handleEdit }: EditModalProps) {
  const [description, setDescription] = useState(post.description);
  const [link, setLink] = useState(post.link);
  const [loading, setLoading] = useState(false);

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const styles = {
    content: {
      base:
        "bg-white border-none rounded-[20px] overflow-hidden px-0 pt-2 pb-0 " +
        "w-[calc(100%-24px)] max-w-[420px] left-1/2 -translate-x-1/2 bottom-[72px] translate-y-0 " +
        "lg:bg-[#333333] lg:px-6 lg:py-6 lg:bottom-auto lg:top-[50%] lg:translate-y-[-50%] " +
        "lg:max-w-[600px] lg:shadow-[0px_0px_20px_0px_#1877F280]",
    },
    wrapper: {
      base: "flex flex-col gap-3",
      lg: "lg:gap-5",
    },
    header_row_mobile: {
      base: "flex justify-end px-3 lg:hidden",
    },
    close_mobile: {
      base:
        "text-[#1877F2] text-[14px] font-lato font-bold px-1 py-0.5 " +
        "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    field_group: {
      base: "flex flex-col gap-1 px-3 lg:px-0",
      lg: "",
    },
    label: {
      base: "hidden lg:block font-lato font-normal text-white text-[14px]",
      lg: "",
    },
    input: {
      base:
        "w-full rounded-md bg-[#F1F1F1] border-none px-3 py-2 text-[14px] text-[#151515] " +
        "outline-none focus:ring-2 focus:ring-[#1877F2]",
      lg: "",
    },
    textarea: {
      base:
        "w-full rounded-md bg-[#F1F1F1] border-none px-3 py-2 text-[14px] text-[#151515] " +
        "outline-none focus:ring-2 focus:ring-[#1877F2] resize-none min-h-[110px]",
      lg: "",
    },
    buttons_container_mobile: {
      base: "mt-3 px-3 pb-3 lg:hidden",
    },
    confirm_button_mobile: {
      base:
        "w-full px-6 py-2 rounded-md bg-[#1877F2] text-white font-lato font-bold text-[14px] " +
        "hover:bg-[#1668d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    },
    buttons_container_desktop: {
      base: "hidden lg:flex lg:justify-center lg:gap-4 lg:mt-4",
    },
    cancel_button_desktop: {
      base:
        "px-6 py-2 rounded-md bg-white text-[#1877F2] font-lato font-bold text-[14px] " +
        "hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    },
    confirm_button_desktop: {
      base:
        "px-6 py-2 rounded-md bg-[#1877F2] text-white font-lato font-bold text-[14px] " +
        "hover:bg-[#1668d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    },
  };

  useEffect(() => {
    if (open && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setDescription(post.description);
      setLink(post.link);
    }
  }, [open, post.description, post.link]);

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setDescription(post.description);
      setLink(post.link);
      setLoading(false);
    }

    setOpen(isOpen);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      const success = await handleEdit(post.id, { description, link });

      if (success) {
        setOpen(false);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} aria-describedby={undefined} className={classNames(styles.content.base)}>
        <DialogTitle className="sr-only">Editar publicação</DialogTitle>

        <form onSubmit={onSubmit} className={classNames(styles.wrapper.base, styles.wrapper.lg)}>
          <div className={styles.header_row_mobile.base}>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className={styles.close_mobile.base}
            >
              Fechar
            </button>
          </div>

          <div className={classNames(styles.field_group.base, styles.field_group.lg)}>
            <label className={classNames(styles.label.base, styles.label.lg)}>Link do post:</label>
            <input
              ref={firstInputRef}
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={loading}
              className={classNames(styles.input.base, styles.input.lg)}
              placeholder="Link do post:"
            />
          </div>

          <div className={classNames(styles.field_group.base, styles.field_group.lg)}>
            <label className={classNames(styles.label.base, styles.label.lg)}>Descrição do post:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className={classNames(styles.textarea.base, styles.textarea.lg)}
              placeholder="Descrição do post:"
            />
          </div>

          <div className={styles.buttons_container_mobile.base}>
            <button type="submit" disabled={loading} className={styles.confirm_button_mobile.base}>
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>

          <div className={styles.buttons_container_desktop.base}>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className={styles.cancel_button_desktop.base}
            >
              Fechar
            </button>

            <button type="submit" disabled={loading} className={styles.confirm_button_desktop.base}>
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
