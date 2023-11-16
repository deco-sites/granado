import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "$store/islands/Header/NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <div class="w-screen">
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="group hover:bg-opacity-100 hidden md:flex md:flex-row items-center w-full py-6 px-8 hover:from-white hover:to-white  bg-gradient-to-b from-black to-transparent bg-opacity-50 transition-all duration-300 ease-in-out">
        <div class="flex justify-start w-full">
          {items.map((item, index) => <NavItem item={item} index={index} />)}
        </div>
        <div class="flex justify-center w-[170px] mr-auto">
          {logo && (
            <div class="relative top-0 w-[170px] h-20">
              <a href="/" aria-label="Granado logo" class="w-[160px] absolute">
                <Icon
                  id="LogoHover"
                  width={160}
                  height={70}
                  class="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                />
              </a>
              <a
                href="/"
                aria-label="Granado logo"
                class="w-[160px] absolute opacity-100 group-hover:opacity-0 transition-all duration-300 ease-in-out"
              >
                <Icon id="Logo" width={160} height={70} class="opacity-100" />
              </a>
            </div>
          )}
        </div>

        <div class="flex-row flex items-center justify-end w-full">
          <div class="flex flex-grow min-w-[150px] max-w-[300px] items-center ">
            <SearchButton />
            <Searchbar searchbar={searchbar} />
          </div>
          <button class="flex flex-row items-center ml-5">
            <img
              src="https://www.granado.com.br/static/version1699940359/frontend/Nectar/granado/pt_BR/images/flag-br.svg"
              width={30}
              height={20}
              class="mr-[10px]"
            />
            <span class="group-hover:text-black text-white text-lg font-medium">
              BR
            </span>
          </button>
          <a
            class="h-10 w-10 items-center ml-5"
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id="User"
              strokeWidth={1}
              class="w-full h-full mt-1 text-white group-hover:text-black ml-5"
            />
          </a>
          <a
            class="h-8 w-10 items-center ml-6 mr-6"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              fill="none"
              strokeWidth={2}
              width={26}
              height={26}
              class="w-full h-full text-white group-hover:text-black ml-5 "
            />
          </a>

          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
