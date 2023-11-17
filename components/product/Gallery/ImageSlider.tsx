import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import ProductDescription from  "../ProductDescription.tsx"

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const {
    breadcrumbList
  } = props.page;
  const aspectRatio = `${width} / ${height}`;
 
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const items = props.page.product.isVariantOf.image
  breadcrumb.itemListElement.push({ name: props.page.product.name, item: "/" })
  
  const inFocus = useSignal(0);
  return (
    <div id={id} class="w-full mt-[123px] lg:ml-8">
       <Breadcrumb itemListElement={breadcrumb.itemListElement} />
    <div
      class=" grid grid-cols-2 overflow-auto snap-x snap-mandatory scroll-smooth scrollbar-none sm:gap-2 mt-6"
      onScroll={(e) => {
        const totalScroll = (e.srcElement as HTMLElement)?.scrollWidth;
        const space = totalScroll / images1?.length;
        const currentScroll = (e.srcElement as HTMLElement)?.scrollLeft;
        inFocus.value = Math.round(currentScroll / space);
      }}
    >
      {items?.map((img, index) => (
        <Image
          style={{ aspectRatio: "580 / 750" }}
          class="snap-center min-w-[100vw] sm:min-w-full lg:min-w-0 cursor-pointer"
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={img.url!}
          alt={img.alternateName}
          width={580}
          height={750}
          // Preload LCP image for better web vitals
          preload={index < 1}
          loading={index < 1 ? "eager" : "lazy"}
         
        />
      ))}
    </div>
    <div class="mt-[100px]">
      <ProductDescription />
    </div>

  </div>
  );
}
