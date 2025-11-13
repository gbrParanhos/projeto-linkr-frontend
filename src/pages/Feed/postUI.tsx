import { useContext } from "react";
import { usePost } from "./usePost";
import { NewPostCard } from "../../components/molecules/NewPostCard";
import { Loader2 } from "lucide-react";
import PostItem from "../../components/molecules/PostItem";
import MobilePostSheet from "../../components/organisms/MobilePostSheet";
import PostBoxContext from "../../contexts/PostBoxContext";

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
    handleDelete,
    handleEdit,
  } = usePost();

  const { isPostBoxOpen, setIsPostBoxOpen } = useContext(PostBoxContext);

  return (
    <div className="flex flex-col items-center 2xl:items-start gap-5 w-full">
      {/* Criador de post desktop */}
      <div className="hidden lg:block w-full">
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
      </div>

      {/* Criador de post mobile (sheet) */}
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

      <div className="w-full flex flex-col gap-5 mt-2">
        {loadingPosts ? (
          <div className="flex items-center justify-center gap-2 text-white">
            <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
            Carregando...
          </div>
        ) : posts.length ? (
          posts.map((post, index) => (
            <PostItem
              key={index}
              post={post}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p className="mt-20 text-center text-2xl gap-2 text-white">
            Nenhuma postagem no momento...
          </p>
        )}
      </div>
    </div>
  );
}
