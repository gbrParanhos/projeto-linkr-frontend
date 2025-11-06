import { usePost } from "./usePost";
import { PostCard } from "../../components/molecules/PostCard";

export default function PostUI() {
  const {
    link,
    description,
    setLink,
    setDescription,
    loading,
    handlePost,
    user,
  } = usePost();

  return (
    <div className="w-full">
      <PostCard
        avatarUrl={user?.image_url}
        link={link}
        description={description}
        onLinkChange={setLink}
        onDescriptionChange={setDescription}
        onSubmit={handlePost}
        disabled={loading}
        loading={loading}
        buttonLabel="Publicar"
      />
    </div>
  );
}
