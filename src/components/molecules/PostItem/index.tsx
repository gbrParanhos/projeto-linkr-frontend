import classNames from "classnames";
import type { Post, TMetaData } from "../../../types";
import parseHashtags, { fetchMetadata } from "../../../utils/helper";
import Avatar from "../../atoms/Avatar";
import { useEffect, useState } from "react";
import MetaDataCard from "../../atoms/MetaDataCard";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const styles = {
    container: {
      base: 'w-full flex flex-col gap-6 bg-[#171717] px-3 pt-2.5 pb-12',
      lg: 'lg:px-5 lg:pt-6 lg:pb-7 lg:w-[615px] lg:rounded-3xl'
    },
    avatar_container: {
      base: 'flex items-center'
    },
    image_border: {
      base: 'rounded-full z-10',
      lg: 'lg:w-[60px] lg:border-[#333333] lg:border-[5px]'
    },
    username: {
      base: 'font-lato text-white pl-5 pr-3 py-1 z-0',
      lg: 'lg:bg-[#333333] lg:text-[20px] lg:rounded-r-[15px] lg:-ml-3'
    },
    description: {
      base: 'font-lato text-[#B7B7B7] text-[17px]',
      lg: 'lg:w-10/12 lg:self-end'
    }
  };

  const [metaData, setMetaData] = useState<TMetaData | null>(null)

  useEffect(() => {
    (async () => {
      if (!metaData) {
        const metadata = await fetchMetadata(post.link);
        setMetaData(metadata);
      }
    })()
  }, [ post, metaData ]);

  return (
    <div className={classNames(styles.container.base, styles.container.lg)}>
      <div className={styles.avatar_container.base}>
        <div className={classNames(styles.image_border.base, styles.image_border.lg)}>
          <Avatar image_url={post.user.image_url} size={50} />
        </div>
        <p className={classNames(styles.username.base, styles.username.lg)}>{post.user.name}</p>
      </div>

      <p className={classNames(styles.description.base, styles.description.lg)}>{parseHashtags(post.description)}</p>
      
      <MetaDataCard metaData={metaData} />
    </div>
  );
}