import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";

function NavItem(
  { item, index }: { item: SiteNavigationElement; index: number },
) {
  const { name, children } = item;
  const image = item?.image?.[0];
  const open = useSignal(false);

  return (
    <li class="flex items-center">
      <button
        onClick={() => open.value = !open.value}
        class="px-3 py-3 group-hover:text-black text-white text-[17px] uppercase flex flex-row"
      >
        {index == 0
          ? <Icon id="Bars3" size={24} strokeWidth={0.001} class="mr-1" />
          : ""}
        {name}
      </button>

      {children && children.length > 0 && open.value &&
        (
          <div
            class="fixed flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: 163 }}
          >
            {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
