import FeedUI from "./FeedUI";
import { useFeed } from "./useFeed";

export default function FeedPage() {
  const feed = useFeed();

  console.log(feed);

  return (
    <FeedUI
    />
  );
}
