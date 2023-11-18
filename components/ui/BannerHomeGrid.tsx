import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  
  picture: ImageWidget;
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
      picture:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
    },
    {
      alt: "a",
      href: "a",
      picture:
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
    <section class="container w-full px-4 md:px-0 mx-auto h-full py-10">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="text-lg leading-5 font-semibold uppercase">
              {title}
            </h2>

            <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
          </div>
        )}
          <div class="flex md:flex-row flex-col h-full max-h-[620px]">
            {/* BIG ONE */}
            <a href={banners[0].href} class="md:w-[60%] md:mb-0 mb-[15px] w-full mr-[15px] h-[153px] md:h-full max-h-[620px]">
              <Image
                sizes="(max-width: 767px) 100%, 50%"
                src={banners[0].picture}
                alt={banners[0].alt}
                href={banners[0].href}
                width={863}
                height={607}
                loading="lazy"
                class="object-cover h-full w-full rounded-md"
              />
            </a>

            {/* OTHERS */}
            <div class="md:w-[40%] w-full flex flex-col gap-y-[15px]"> 
            {banners.slice(1, 3).map((item, index) => (
              <a href={item.href} class={`w-[100%] h-[153px] md:h-full`}>
                <Image
                  sizes="(max-width: 767px) 100%, 50%"
                  src={item.picture}
                  alt={item.alt}
                  href={item.href}
                  width={580}
                  height={272}
                  loading="lazy"
                  class="object-cover h-full w-full rounded-md"
                />
              </a>
            ))}
            </div>
          </div>
    </section>
  );
}
