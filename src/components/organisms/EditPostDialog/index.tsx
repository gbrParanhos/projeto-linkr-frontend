import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "../../atoms/Card";
import DefaultInput from "../../atoms/DefaultInput";
import { Button } from "../../atoms/Button";

type Props = Readonly<{
  open: boolean;
  onClose: () => void;
  initialLink: string;
  initialDescription: string;
  onSave: (values: { link: string; description: string }) => Promise<void>;
}>;

export default function EditPostDialog({
  open,
  onClose,
  initialLink,
  initialDescription,
  onSave,
}: Props) {
  const [link, setLink] = useState(initialLink);
  const [description, setDescription] = useState(initialDescription);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const canSave = useMemo(() => !!link.trim(), [link]);

  useEffect(() => {
    if (!open) {
      dialogRef.current?.close();
      return;
    }
    setLink(initialLink);
    setDescription(initialDescription);
    dialogRef.current?.showModal();
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open, initialLink, initialDescription]);

  async function handleSave() {
    if (!canSave || saving) return;
    try {
      setSaving(true);
      await onSave({ link: link.trim(), description });
      onClose();
    } catch {
      alert("Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      className="backdrop:bg-black/40 rounded-2xl"
    >
      <Card className="w-[min(92vw,420px)] bg-white rounded-2xl shadow-md">
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-lato font-bold text-[18px] text-[#333]">Editar post</h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="text-[#1877F2] text-[14px] font-semibold"
            >
              Fechar
            </button>
          </div>

          <DefaultInput
            ref={inputRef}
            type="url"
            placeholder="http://..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            disabled={saving}
            className="bg-[#D9D9D9] text-[#707070] text-[15px] w-full h-9 px-3 rounded-xl border-none placeholder:text-[#9F9F9F]"
          />

          <textarea
            placeholder="Atualize a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
            }}
            disabled={saving}
            rows={5}
            className="bg-[#D9D9D9] text-[#707070] text-[15px] w-full h-[120px] p-3 rounded-xl resize-none outline-none placeholder:text-[#9F9F9F]"
          />

          <div className="w-full h-[33px] px-1 flex justify-between">
            <Button
              onClick={handleSave}
              disabled={!canSave || saving}
              className="bg-[#1877F2] hover:bg-[#166fe0] text-white font-bold text-[16px] w-full h-full rounded-[10px] transition-all disabled:opacity-70"
            >
              {saving ? "Atualizando..." : "Atualizar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </dialog>
  );
}
