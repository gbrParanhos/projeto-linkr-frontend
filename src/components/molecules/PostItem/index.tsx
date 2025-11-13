import classNames from "classnames";
import type { Post, TMetaData } from "../../../types";
import parseHashtags, { fetchMetadata } from "../../../utils/helper";
import Avatar from "../../atoms/Avatar";
import { useEffect, useState } from "react";
import MetaDataCard from "../../atoms/MetaDataCard";
import { Pencil, Trash } from "lucide-react";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";

interface PostItemProps {
  post: Post;
  handleDelete: (postId: number) => Promise<void>;
  handleEdit: (
    postId: number,
    data: { description: string; link: string }
  ) => Promise<boolean>;
}

export default function PostItem({
  post,
  handleDelete,
  handleEdit,
}: PostItemProps) {
  const styles = {
    container: {
      base: "w-full flex flex-col gap-6 bg-[#171717] px-3 pt-2.5 pb-12 z-0",
      lg: "lg:px-5 lg:pt-6 lg:pb-7 lg:w-[615px] lg:rounded-3xl",
    },
    row_actions: {
      base: "flex justify-between items-center",
      lg: "",
    },
    container_buttons: {
      base: "flex gap-8",
      lg: "lg:gap-2.5",
    },
    avatar_container: {
      base: "flex items-center",
    },
    image_border: {
      base: "w-[40px] h-[40px] rounded-full z-10 overflow-hidden flex items-center justify-center bg-[#333333]",
      lg: "lg:w-[60px] lg:h-[60px] lg:border-[#333333] lg:border-[5px]",
    },
    username: {
      base: "font-lato text-white pl-5 pr-3 py-1 z-5",
      lg: "lg:bg-[#333333] lg:text-[20px] lg:rounded-r-[15px] lg:-ml-3",
    },
    description: {
      base: "font-lato text-[#B7B7B7] text-[17px]",
      lg: "lg:w-10/12 lg:self-end",
    },
  };

  const [metaData, setMetaData] = useState<TMetaData | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  useEffect(() => {
    (async () => {
      if (!metaData) {
        const metadata = await fetchMetadata(post.link);
        setMetaData(metadata);
      }
    })();
  }, [post, metaData]);

  return (
    <div className={classNames(styles.container.base, styles.container.lg)}>
      <div className={classNames(styles.row_actions.base, styles.row_actions.lg)}>
        <div className={styles.avatar_container.base}>
          <div className={classNames(styles.image_border.base, styles.image_border.lg)}>
            <Avatar image_url={post.user.image_url} size={50} />
          </div>
          <p className={classNames(styles.username.base, styles.username.lg)}>
            {post.user.name}
          </p>
        </div>

        <div
          className={classNames(
            styles.container_buttons.base,
            styles.container_buttons.lg
          )}
        >
          <button onClick={() => setIsOpenEditModal(true)}>
            <Pencil className="w-5 lg:w-6 h-5 lg:h-6 text-white hover:text-gray-300 transition-colors" />
          </button>
          <button onClick={() => setIsOpenDeleteModal(true)}>
            <Trash className="w-5 lg:w-6 h-5 lg:h-6 text-white hover:text-gray-300 transition-colors" />
          </button>
        </div>
      </div>

      <p
        className={classNames(
          styles.description.base,
          styles.description.lg
        )}
      >
        {parseHashtags(post.description)}
      </p>

      <MetaDataCard metaData={metaData} />

      <EditModal
        open={isOpenEditModal}
        setOpen={setIsOpenEditModal}
        post={{
          id: post.id,
          description: post.description,
          link: post.link,
        }}
        handleEdit={handleEdit}
      />

      <DeleteModal
        open={isOpenDeleteModal}
        setOpen={setIsOpenDeleteModal}
        postId={post.id}
        handleDelete={handleDelete}
      />
    </div>
  );
}
