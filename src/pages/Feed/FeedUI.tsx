import PostUI from "./postUI";

export default function FeedUI() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#333333]">
      <div className="w-full max-w-[937px] mx-auto flex flex-col items-end pr-[24px]">
        <h1
          className="
            font-passion font-bold text-[43px]
            leading-[100%] tracking-[0em]
            text-white
            mt-[105px] mb-[43px]
            mr-[525px]
          "
        >
          Feed
        </h1>

        <div className="w-[611px]">
          <PostUI />
        </div>
      </div>
    </div>
  );
}
