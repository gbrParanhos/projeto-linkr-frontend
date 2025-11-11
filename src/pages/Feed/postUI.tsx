import { usePost } from "./usePost";
import { PostCard } from "../../components/molecules/PostCard";
import { Loader2 } from "lucide-react";
import PostItem from "../../components/molecules/PostItem";

export default function PostUI() {
  const {
    link,
    description,
    setLink,
    setDescription,
    loading,
    handlePost,
    loadingPosts,
    posts,
    handleDelete
  } = usePost();

  return (
    <div className="flex flex-col items-center 2xl:items-start gap-5 w-full">
      <PostCard
        link={link}
        description={description}
        onLinkChange={setLink}
        onDescriptionChange={setDescription}
        onSubmit={handlePost}
        disabled={loading}
        loading={loading}
        buttonLabel="Publicar"
      />
      <div className="w-full flex flex-col gap-5">
        {loadingPosts ? (
          <div className="flex items-center justify-center gap-2 text-white">
            <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
            Carregando...
          </div>
          ) : (
          posts.length ? (
            posts.map((post, index) => (
              <PostItem post={post} key={index} handleDelete={handleDelete} />
            ))
          ) : (
            <p className="mt-20 text-center text-2xl gap-2 text-white" >Nenhuma postagem no momento...</p>
          )
        )}
      </div>
    </div>
  );
}
