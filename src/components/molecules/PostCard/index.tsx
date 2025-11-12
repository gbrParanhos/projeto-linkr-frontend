import { useEffect, useMemo, useRef, useState, useContext } from "react";
import type { Post } from "../../../types";
import parseHashtags from "../../../utils/helper";
import Avatar from "../../atoms/Avatar";
import { Pen } from "lucide-react";
import { Card, CardContent } from "../../atoms/Card";
import DefaultInput from "../../atoms/DefaultInput";
import { Button } from "../../atoms/Button";
import UserContext from "../../../contexts/UserContext";
import api from "../../../services/api";

function readIdFrom(value: unknown): number | undefined {
  if (value && typeof value === "object" && "id" in value) {
    const v = (value as { id?: unknown }).id;
    return typeof v === "number" ? v : undefined;
  }
  return undefined;
}
function getMeIdFromContext(ctx: unknown): number | undefined {
  const direct = readIdFrom(ctx);
  if (direct !== undefined) return direct;
  if (ctx && typeof ctx === "object" && "user" in ctx) {
    return readIdFrom((ctx as { user?: unknown }).user);
  }
  return undefined;
}
function getMeIdFromStorage(): number | undefined {
  try {
    const raw = globalThis.localStorage?.getItem("user_data");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    const direct = readIdFrom(parsed);
    if (direct !== undefined) return direct;
    if (parsed && typeof parsed === "object" && "user" in parsed) {
      return readIdFrom((parsed as { user?: unknown }).user);
    }
  } catch (_e) {
    return undefined;
  }
  return undefined;
}

type WithUserId = Post & { userId?: number | string };

export function PostCard(post: Readonly<Post>) {
  const p = post as WithUserId;

  const initialLink = String(p.link ?? "");
  const initialDesc = String(p.description ?? "");

  const [currentLink, setCurrentLink] = useState<string>(initialLink);
  const [currentDescription, setCurrentDescription] = useState<string>(initialDesc);

  const [openEdit, setOpenEdit] = useState(false);
  const [link, setLink] = useState<string>(initialLink);
  const [description, setDescription] = useState<string>(initialDesc);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const userCtx = useContext(UserContext);
  const meId = useMemo(() => getMeIdFromContext(userCtx) ?? getMeIdFromStorage(), [userCtx]);

  const authorId = p.userId;
  const isAuthor = authorId !== undefined && Number(meId) === Number(authorId);

  useEffect(() => {
    if (!openEdit) {
      const dlg = dialogRef.current;
      dlg?.close();
      return;
    }

    const dlg = dialogRef.current;
    setLink(currentLink);
    setDescription(currentDescription);

    dlg?.showModal();
    const t = setTimeout(() => inputRef.current?.focus(), 0);

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dlg?.close();
    };
    const backdropClick = (e: MouseEvent) => {
      if (!dlg) return;
      const r = dlg.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) dlg.close();
    };

    globalThis.addEventListener("keydown", esc);
    dlg?.addEventListener("mousedown", backdropClick);

    return () => {
      clearTimeout(t);
      globalThis.removeEventListener("keydown", esc);
      dlg?.removeEventListener("mousedown", backdropClick);
    };
  }, [openEdit, currentLink, currentDescription]);

  async function handleSave() {
    const safeLink = (link ?? "").trim();
    if (!safeLink || saving) return;
    try {
      setSaving(true);
      await api.put(`/posts/${p.id}`, { link: safeLink, description: String(description ?? "") });
      setCurrentLink(safeLink);
      setCurrentDescription(String(description ?? ""));
      setOpenEdit(false);
    } catch {
      alert("Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  }

  const inputId = `edit-link-${p.id}`;
  const descId = `edit-description-${p.id}`;

  return (
    <div className="w-full flex flex-col gap-6 bg-[#171717] px-3 pt-2.5 pb-12 lg:px-5 lg:pt-6 lg:pb-7 lg:w-[615px] lg:rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full lg:w-[60px] lg:border-[#333333] lg:border-[5px] z-10">
            <Avatar image_url={p.user.image_url} size={50} />
          </div>
          <p className="font-lato text-white lg:bg-[#333333] lg:text-[20px] pl-5 pr-3 py-1 lg:rounded-r-[15px] lg:-ml-3 z-0">
            {p.user.name}
          </p>
        </div>

        {isAuthor && (
          <button
            type="button"
            onClick={() => setOpenEdit(true)}
            aria-label="Editar post"
            className="p-2 rounded-md hover:bg-white/10 transition"
          >
            <Pen className="w-5 h-5 text-white" aria-hidden="true" />
          </button>
        )}
      </div>

      <p className="font-lato text-[#B7B7B7] text-[17px] lg:w-10/12 lg:self-end">
        {parseHashtags(currentDescription || "")}
      </p>

      <a
        href={currentLink || "#"}
        target="_blank"
        className="font-lato font-bold text-white text-[17px] lg:w-10/12 lg:self-end wrap-break-word"
        rel="noopener noreferrer"
      >
        {currentLink || ""}
      </a>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/40 rounded-2xl"
        onClose={() => setOpenEdit(false)}
        onCancel={() => setOpenEdit(false)}
      >
        <Card className="w-[min(92vw,560px)] bg-[#2b2b2b] text-white rounded-2xl shadow-[0_25px_120px_rgba(0,0,0,0.55)] ring-2 ring-blue-500/60">
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="space-y-1">
              <label htmlFor={inputId} className="block text-sm">Link do post:</label>
              <DefaultInput
                id={inputId}
                ref={inputRef}
                type="url"
                placeholder="http://..."
                value={link ?? ""}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
                disabled={saving}
                className="bg-[#D9D9D9] text-[#333] text-[15px] w-full h-9 px-3 rounded-xl border-none placeholder:text-[#6f6f6f]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={descId} className="block text-sm">Descrição do post:</label>
              <textarea
                id={descId}
                placeholder="Atualize a descrição"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
                }}
                disabled={saving}
                rows={5}
                className="bg-[#D9D9D9] text-[#333] text-[15px] w-full h-[140px] p-3 rounded-xl resize-none outline-none placeholder:text-[#6f6f6f]"
              />
            </div>

            <div className="mt-2 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                disabled={saving}
                className="px-5 h-9 rounded-md bg-white text-[#1877F2] font-semibold disabled:opacity-70"
              >
                Fechar
              </button>
              <Button
                onClick={handleSave}
                disabled={!(link ?? "").trim() || saving}
                className="px-5 h-9 rounded-md bg-[#1877F2] hover:bg-[#166fe0] text-white font-semibold disabled:opacity-70"
              >
                {saving ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </dialog>
    </div>
  );
}
