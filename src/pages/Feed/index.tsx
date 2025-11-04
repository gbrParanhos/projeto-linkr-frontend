import FeedUI from "./FeedUI";
import { useFeed } from "./useFeed";

export default function FeedPage() {
  const { onLogout } = useFeed();

  return (
    <FeedUI
      onLogout={onLogout}
    />
  );
}
