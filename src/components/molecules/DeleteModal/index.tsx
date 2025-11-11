
import {
  Dialog,
  DialogContent
} from "../../atoms/DefaultDialog";
import { useState } from "react";
import classNames from "classnames";

interface DeleteModalProps {
  postId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (postId: number) => Promise<void>;
}

export default function DeleteModal({ postId, handleDelete, open, setOpen }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const styles = {
    content: {
      base: 'bg-white border-none rounded-[20px] overflow-hidden',
      lg: 'lg:bg-[#333333] lg:max-w-[600px] lg:p-10 lg:shadow-[0px_0px_20px_0px_#1877F280]'
    },
    wrapper: {
      base: 'flex flex-col items-center gap-1',
      lg: 'lg:gap-8'
    },
    container_title: {
      base: 'pt-4 px-18',
      lg: 'lg:p-0'
    },
    title: {
      base: 'font-lato font-bold text-[#151515] text-[18px] text-center',
      lg: 'lg:text-[34px] lg:text-white'
    },
    buttons_container: {
      base: 'flex flex-col gap-1 w-full',
      lg: 'lg:flex-row lg:gap-6 lg:w-auto'
    },
    cancel_button: {
      base: 'flex-1 font-lato font-bold underline text-[#1877F2] bg-white rounded-md px-8 py-2 text-[16px] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      lg: 'lg:flex-none lg:px-12 lg:py-3 lg:text-[18px]'
    },
    confirm_button: {
      base: 'flex-1 font-lato font-bold text-white bg-[#1877F2] px-8 py-2 text-[16px] hover:bg-[#1668d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      lg: 'lg:rounded-md lg:flex-none lg:px-12 lg:py-3 lg:text-[18px]'
    }
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      await handleDelete(postId);
      setOpen(false);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        showCloseButton={false}
        className={classNames(styles.content.base, styles.content.lg)}
      >
        <div className={classNames(styles.wrapper.base, styles.wrapper.lg)}>
          <div className={classNames(styles.container_title.base, styles.container_title.lg)}>
            <h2 className={classNames(styles.title.base, styles.title.lg)}>
              Você tem certeza que gostaria de remover a postagem?
            </h2>
          </div>
          <div className={classNames(styles.buttons_container.base, styles.buttons_container.lg)}>
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className={classNames(styles.cancel_button.base, styles.cancel_button.lg)}
            >
              Cancelar
            </button>
            
            <button
              onClick={onConfirm}
              disabled={loading}
              className={classNames(styles.confirm_button.base, styles.confirm_button.lg)}
            >
              {loading ? 'Deletando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}