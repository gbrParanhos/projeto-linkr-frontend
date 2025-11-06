import PostUI from "./postUI";
import SuggestionsPanel from "./SuggestionsPanel";

export default function FeedUI() {
  return (
    <div className="mx-auto w-full max-w-[980px] flex flex-col gap-8">
      <h1 className="font-passion font-bold text-[43px] leading-[100%] tracking-[0em] text-white">
        Feed
      </h1>

      <div className="flex gap-6">
        <div className="w-full max-w-[611px]">
          <PostUI />
        </div>

        <aside className="hidden lg:block sticky top-[185px] w-[328px]">
          <SuggestionsPanel />
        </aside>
      </div>
    </div>
  );
}
