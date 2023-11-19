import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import AnimationJS from "$store/islands/AnimationJS.tsx";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

interface DotsProps {
  images?: Product[];
  interval?: number;
}

function Dots({ images, interval = 0 }: DotsProps) {
  return (
    <>
      <ul
        class={`carousel justify-center row-start-6 col-span-full gap-2 z-10`}
      >
        {images?.map((_, index) => (
          <Slider.Dot index={index}>
            <div
              class={`py-5 ${
                ((index === 0) || (index % 4 === 0)) ? "" : "lg:hidden"
              }`}
            >
              <div
                class="w-[54px] h-[5px] rounded group-disabled:opacity-100 opacity-20 bg-[#929292]"
                style={{ animationDuration: `${interval}s` }}
              />
            </div>
          </Slider.Dot>
        ))}
      </ul>
    </>
  );
}

function ProductShelfWithText({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div id={id} data-animation class="w-full container sm:pl-16 sm:px-0 px-2 py-8 flex flex-col gap-12 lg:gap-16 lg:py-10 mt-[50px] opacity-0 transition-all duration-300">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-[320px] px-10 my-auto text-center h-full items-center">
            <h2 class="lg:text-5xl md:text-[40px]  lg:w-[320px] w-full text-4xl font-normal text-[#004030] mb-4 font-granado">
              Procurando um presente especial? 
            </h2>
            <p class="lg:text-[22px] md:text-xl lg:w-[320px] w-full text-base font-medium text-[#333]">Descubra as opções exclusivas da Granado para presentear!</p>
        </div>
        <div
          id={id}
          class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 lg:ml-20 max-w-[1440px]"
          >
        <Slider class="carousel carousel-center sm:carousel-end gap-3 col-span-full row-start-2 row-end-5 max-w-[1440px]">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[235px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-square hover:bg-white hover:border hover:border-black absolute right-[-50px] bg-base-100">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-square hover:bg-white hover:border hover:border-black absolute left-[-50px] mr-10 bg-base-100">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <Dots images={products} />
        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
      </div>
      <AnimationJS rootId={id} />
    </div>
  );
}

export default ProductShelfWithText;
