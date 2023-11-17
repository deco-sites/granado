import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    product,
  } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col px-20 py-[60px] lg:mt-[133px]" id={id}>
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div>
          {gtin && (
            <span class="text-sm text-base-300">
              Cod. {gtin}
            </span>
          )}
        </div>
        <h1>
          <span class="font-semibold lg:text-[40px] md:text-[36px] sm:text-[32px] text-[#025a44] uppercase mb-[15px] font-granado">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
        <span class="flex flex-row my-3">
          <img src="https://img.freepik.com/vetores-premium/icone-de-classificacao-de-cinco-estrelas-estrelas-de-avaliacao-vetor-estrelas-planas-isoladas_118339-1270.jpg?w=2000" width={90} height={20} class="w-[90px] h-5" />
          <span class="underline font-medium text-sm ml-5">72 Avaliações</span>
        </span>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-medium text-[32px] text-[#025a44] font-granado">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        <span class="text-base font-medium">
          ou 10 x de R$ 32,00 sem juros
        </span>
        <span class="text-sm text-base-300">
          {installments}
        </span>
      </div>
      {/* Sku Selector */}
      {/* <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div> */}
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                  <WishlistButton
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "wake" && (
                <AddToCartButtonWake
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
               <div class="flex flex-row">
                  <div class="border border-gray-2 rounded-[2px] flex mr-4">
                    <button
                     type="button"
                     class="w-[45px] h-[45px] flex items-center justify-center font-bold text-[16px] transition-all duration-1500 active:bg-green active:text-white"
            >
              -
            </button>
            <div class="h-[45px] w-[50px] flex items-center justify-center font-medium text-[14px] text-center">
              1
            </div>
            <button
              type="button"
              class="w-[45px] h-[45px] items-center!text-center flex items-center justify-center font-bold text-[16px] transition-all duration-1500 active:bg-green active:text-white"
            >
              +
            </button>
          </div> 
          <span class="w-full max-w-[250px]">
              <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
          </span>
               </div>     
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div>
      <div class="border-t-black border-t-[1px]">
        <div class="flex sm:flex-row flex-col mt-5 text-sm">
          <div class="flex flex-row items-center">
            <Icon
              id="Heart"
              fill="none"
              strokeWidth={2}
              width={24}
              height={24}
              class="text-[#025a44] h-full hover:fill-[#025a44] cursor-pointer mr-2"
            />
            <span>Adicionar à lista de favoritos</span>
           </div>
           
            <button class="flex flex-row ml-8 items-center">
            <Icon
              id="Share"
              fill="none"
              strokeWidth={1}
              width={24}
              height={24}
              class="text-[#025a44] h-full hover:fill-[#025a44] cursor-pointer"
            />
            <span class="ml-1">Compartilhar</span>
            </button>
           
        </div>
      </div>
      
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
