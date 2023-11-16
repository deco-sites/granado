import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <button
        class="hidden sm:block w-full"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <div class="w-full flex max-w-[300px] flex-row relative items-center">
          <input
            class="input input-bordered w-full lg:block hidden"
            placeholder="O que você está buscando hoje?"
          />
          <Icon
            id="MagnifyingGlass"
            size={24}
            strokeWidth={0.1}
            class="absolute right-2"
          />
        </div>
      </button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden"
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <Icon id="MagnifyingGlass" size={24} strokeWidth={0.1} />
      </Button>
    </>
  );
}
