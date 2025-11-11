import { usePost } from "./usePost";
import { NewPostCard } from "../../components/molecules/NewPostCard";
import { Loader2 } from "lucide-react";
import { PostCard } from "../../components/molecules/PostCard";
import { useContext, type ReactNode } from "react";
import PostBoxContext from "../../contexts/PostBoxContext";
import MobilePostSheet from "../../components/organisms/MobilePostSheet";

export default function PostUI() {
  const { link, description, setLink, setDescription, loading, handlePost, loadingPosts, posts } = usePost();
  const { isPostBoxOpen, setIsPostBoxOpen } = useContext(PostBoxContext);

  let postsContent: ReactNode;
  if (loadingPosts) {
    postsContent = (
      <div className="flex items-center justify-center gap-2 text-white">
        <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
        Carregando...
      </div>
    );
  } else if (posts.length > 0) {
    postsContent = posts.map((post) => <PostCard key={post.id ?? post.link} {...post} />);
  } else {
    postsContent = <p className="mt-20 text-center text-2xl gap-2 text-white">Nenhuma postagem no momento...</p>;
  }

  return (
    <div className="flex flex-col items-center 2xl:items-start gap-5 w-full">
      <NewPostCard
        link={link}
        description={description}
        onLinkChange={setLink}
        onDescriptionChange={setDescription}
        onSubmit={handlePost}
        disabled={loading}
        loading={loading}
        buttonLabel="Publicar"
      />
      <div className="w-full flex flex-col gap-5">{postsContent}</div>
      <MobilePostSheet
        open={isPostBoxOpen}
        onClose={() => setIsPostBoxOpen(false)}
        link={link}
        description={description}
        onLinkChange={setLink}
        onDescriptionChange={setDescription}
        onSubmit={handlePost}
        loading={loading}
      />
    </div>
  );
}
