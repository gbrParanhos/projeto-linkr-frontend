import { Loader2 } from "lucide-react";
import type { TMetaData } from "../../../types";
import classNames from "classnames";

interface MetaDataCardProps {
  metaData: TMetaData | null;
}

export default function MetaDataCard({ metaData }: MetaDataCardProps) {
  const styles = {
    container: {
      base: 'w-full h-28 border-1 border-[#4C4C4C] rounded-xl overflow-hidden',
      lg: 'lg:w-10/12 lg:self-end lg:h-40',
      loading: 'flex justify-center align-center'
    },
    content: {
      base: 'flex justify-between gap-3',
      lg: ''
    },
    content_text: {
      base: 'flex flex-col justify-between min-w-0 p-2.5',
      lg: ''
    },
    title: {
      base: 'font-lato text-[#CECECE] text-[12px] line-clamp-2',
      lg: 'lg:text-[16px] lg:leading-tight'
    },
    description: {
      base: 'font-lato font-light text-[#9B9595] text-[10px] line-clamp-2',
      lg: 'lg:text-[11px] lg:leading-tight lg:line-clamp-5'
    },
    url: {
      base: 'font-lato font-light italic text-[#CECECE] text-[9px] block truncate',
      lg: 'lg:text-[11px] lg:leading-tight'
    },
    container_img: {
      base: 'h-28 shrink-0',
      lg: 'lg:h-40'
    },
    img: {
      base: 'h-full w-auto object-contain',
      lg: ''
    },
  };

  return (
    <a href={metaData?.url} target="_blank" className={classNames(
      styles.container.base, 
      styles.container.lg,
      !metaData && styles.container.loading
    )}>
      {
        metaData ? (
          <div className={classNames(styles.content.base, styles.content.lg)}>
            <div className={classNames(styles.content_text.base, styles.content_text.lg)}>
              <p className={classNames(styles.title.base, styles.title.lg)}>{metaData.title}</p>
              <p className={classNames(styles.description.base, styles.description.lg)}>{metaData.description}</p>
              <p className={classNames(styles.url.base, styles.url.lg)}>{metaData.url}</p>
            </div>
            <div className={classNames(styles.container_img.base, styles.container_img.lg)}>
              {metaData.images && <img className={classNames(styles.img.base, styles.img.lg)} src={metaData.images} alt="metadata-img" />}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm">Carregando...</span>
          </div>
        )
      }
    </a>
  );
}