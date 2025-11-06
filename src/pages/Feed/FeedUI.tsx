import PostUI from "./postUI";

export default function FeedUI() {
  return (
      <div className="max-w-[937px] flex flex-col gap-8">
        <h1
          className="
            font-passion font-bold text-[43px]
            leading-[100%] tracking-[0em]
            text-white
          "
        >
          Feed
        </h1>

        <div className="w-[611px]">
          <PostUI />
        </div>
      </div>
  );
}
