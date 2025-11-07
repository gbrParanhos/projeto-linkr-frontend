import { usePost } from "./usePost";
import { PostCard } from "../../components/molecules/PostCard";
import { Loader2 } from "lucide-react";
import Avatar from "../../components/atoms/Avatar";
import parseHashtags from "../../utils/helper";

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
              <div key={index} className="w-full flex flex-col gap-6 bg-[#171717] px-3 pt-2.5 pb-12 lg:px-5 lg:pt-6 lg:pb-7 lg:w-[615px] lg:rounded-3xl">
                <div className="flex items-center">
                  <div className="rounded-full lg:w-[60px] lg:border-[#333333] lg:border-[5px] z-10">
                    <Avatar image_url={post.user.image_url} size={50} />
                  </div>
                  <p className="font-lato text-white lg:bg-[#333333] lg:text-[20px] pl-5 pr-3 py-1 lg:rounded-r-[15px] lg:-ml-3 z-0">{post.user.name}</p>
                </div>
  
                <p className="font-lato text-[#B7B7B7] text-[17px] lg:w-10/12 lg:self-end">{parseHashtags(post.description)}</p>
                <a href={post.link} target="_blank" className="font-lato font-bold text-white text-[17px] lg:w-10/12 lg:self-end">{post.link}</a>
              </div>
            ))
          ) : (
            <p className="mt-20 text-center text-2xl gap-2 text-white" >Nenhuma postagem no momento...</p>
          )
        )}
      </div>
    </div>
  );
}
