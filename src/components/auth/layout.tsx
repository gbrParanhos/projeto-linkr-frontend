import type { ReactNode } from "react";


export default function Layout({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden">

      <section className="flex-1 bg-black text-white flex flex-col justify-center items-start px-8 sm:px-10 lg:px-20 py-12 lg:py-16 text-left">
        {hero}
      </section>
      <section className="flex-1 bg-[#333333] flex items-center justify-center p-6 sm:p-8">
        {children}
      </section>
    </main>
  );
}