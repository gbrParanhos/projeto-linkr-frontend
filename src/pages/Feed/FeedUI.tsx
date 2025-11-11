import PostUI from "./postUI";
import SuggestionsPanel from "./SuggestionsPanel";

export default function FeedUI() {
  return (
    <>
      <h1 className="font-passion font-bold text-[28px] text-white lg:text-[43px]">Feed</h1>

      <div className="flex w-full lg:w-auto gap-8">
        <PostUI />

        <aside className="hidden sticky h-fit top-[100px] 2xl:block">
          <SuggestionsPanel />
        </aside>
      </div>
    </>
  );
}
