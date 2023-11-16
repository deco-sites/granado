import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export interface Props {
  title?: string;
  banners: Banner[];
}


const DEFAULT_PROPS: Props = {
  title: "Summer bags",
  banners: [
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
    },
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/c5c6bdf6-5555-488c-8b14-719e4158dea6",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3e2b7824-d75c-4704-8d32-621bfc9b20cf",
    },
  ],
};

export default function BannnerHomeGrid(props: Props) {
  const {
    title,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section class="container w-full px-4 md:px-0 mx-auto">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="text-lg leading-5 font-semibold uppercase">
              {title}
            </h2>

            <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
          </div>
        )}
      <div
        class={`flex flex-row`}
      >
        {banners.map(({ href, srcMobile, srcDesktop, alt }, index) => (
          <div>
            {index == 0 ?  
            <a
            href={href}
            class="w-[60%]"
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={100}
                height={100}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={250}
                height={250}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a> :  <a
            href={href}
            class="w-[40%]"
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={100}
                height={100}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={250}
                height={250}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>}
          </div>
         
        ))}
      </div>
    </section>
  );
}
