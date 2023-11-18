import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const filters1 = [
    {
      "@type": "FilterToggle",
      key: "price",
      label: "Preço",
      quantity: 3,
      values: [
        {
          value: "159:180",
          quantity: 24,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.price=159%3A",
          label: "159:180"
        },
        {
          value: "200:259",
          quantity: 9,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.price=200%3A",
          label: "200:259"
        },
        {
          value: "180:200",
          quantity: 9,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.price=180%3A",
          label: "180:200"
        }
      ]
    },
    {
      "@type": "FilterToggle",
      key: "cor-basica",
      label: "Cor Básica",
      quantity: 9,
      values: [
        {
          value: "amarelo--ffe746",
          quantity: 1,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=a",
          label: "AMARELO #ffe746"
        },
        {
          value: "azul--2f7ab3",
          quantity: 12,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=a",
          label: "AZUL #2f7ab3"
        },
        {
          value: "branco--ffffff",
          quantity: 4,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=b",
          label: "BRANCO #ffffff"
        },
        {
          value: "caqui--ddaf66",
          quantity: 2,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=c",
          label: "CAQUI #ddaf66"
        },
        {
          value: "cinza--d2d2cb",
          quantity: 3,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=c",
          label: "CINZA #d2d2cb"
        },
        {
          value: "preto--000000",
          quantity: 5,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=p",
          label: "PRETO #000000"
        },
        {
          value: "rosa--ffcccc",
          quantity: 2,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=r",
          label: "ROSA #ffcccc"
        },
        {
          value: "verde--9fd573",
          quantity: 4,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=v",
          label: "VERDE #9fd573"
        },
        {
          value: "vermelho--ea3a3a",
          quantity: 1,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.cor-basica=v",
          label: "VERMELHO #ea3a3a"
        }
      ]
    },
    {
      "@type": "FilterToggle",
      key: "linha",
      label: "Linha",
      quantity: 3,
      values: [
        {
          value: "basicas",
          quantity: 8,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.linha=basica",
          label: "Básicas"
        },
        {
          value: "casuais",
          quantity: 31,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.linha=casuai",
          label: "Casuais"
        },
        {
          value: "t-shirts",
          quantity: 2,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.linha=t-shir",
          label: "T-shirts"
        }
      ]
    },
    {
      "@type": "FilterToggle",
      key: "manga",
      label: "Manga",
      quantity: 2,
      values: [
        {
          value: "manga-longa",
          quantity: 2,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.manga=manga-",
          label: "Manga Longa"
        },
        {
          value: "manga-curta",
          quantity: 36,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.manga=manga-",
          label: "Manga Curta"
        }
      ]
    },
    {
      "@type": "FilterToggle",
      key: "tamanho",
      label: "Tamanho",
      quantity: 6,
      values: [
        {
          value: "p",
          quantity: 41,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.tamanho=p",
          label: "P"
        },
        {
          value: "m",
          quantity: 41,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.tamanho=m",
          label: "M"
        },
        {
          value: "g",
          quantity: 40,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.tamanho=g",
          label: "G"
        },
        {
          value: "gg",
          quantity: 42,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.tamanho=gg",
          label: "GG"
        },
        {
          value: "xxg",
          quantity: 42,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.tamanho=xxg",
          label: "XXG"
        },
        {
          value: "xxxg",
          quantity: 42,
          selected: false,
          url: "?sort=name%3Aasc&filter.category-1=roupas-masculinas&filter.category-2=camisetas&filter.tamanho=xxxg",
          label: "XXXG"
        }
      ]
    }
  ]

  return (
    <>
      <div class="container px-4 sm:py-10 mt-20">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters1.length > 0 && (
            <aside class="hidden sm:block w-1/4 min-w-[250px]">
              <Filters filters={filters1} />
            </aside>
          )}
          <div class="flex-grow w-3/4 pl-10" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {zeroIndexedOffsetPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
