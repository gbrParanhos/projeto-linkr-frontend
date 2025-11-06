import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

type Suggestion = {
  id: number;
  name: string;
  image_url: string | null;
  followsYou: boolean;
};

export default function SuggestionsPanel() {
  const [items, setItems] = useState<Suggestion[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get("/users/suggestions");
        if (!active) return;
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const top5 = useMemo(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [items]);

  return (
    <div className="w-[328px] h-[377px] rounded-[15px] p-2.5 bg-[#1C1C1C] flex flex-col gap-3 overflow-hidden">
      <h2 className="w-[308px] h-10 mx-auto text-center text-white font-oswald font-bold text-[27px] leading-[100%]">
        Sugestões para seguir
      </h2>

      <div className="w-full h-px bg-[#2B2B2B] rounded-full" />

      <ul className="flex flex-col gap-3">
        {top5.map((p) => (
          <li
            key={p.id}
            className="w-[308px] h-[49px] mx-auto rounded-[5px] bg-[#2B2B2B] px-2.5 py-[5px] flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={
                  p.image_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=2B2B2B&color=fff`
                }
                alt={p.name}
                className="w-[34px] h-[34px] rounded-full object-cover"
              />
              <span className="text-white text-sm">{p.name}</span>
            </div>

            {p.followsYou && (
              <span className="text-[11px] leading-none text-[#D0D0D0] bg-[#3A3A3A] px-3 py-1 rounded-full">
                Segue você
              </span>
            )}
          </li>
        ))}

        {top5.length === 0 && (
          <li className="w-[308px] mx-auto text-center text-[#B0B0B0] text-sm py-3">
            Nenhuma sugestão no momento
          </li>
        )}
      </ul>
    </div>
  );
}
