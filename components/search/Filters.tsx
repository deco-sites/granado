import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-6 bg-[#f6f3f8] rounded">
      <span class="text-[32px] font-medium">Filtros</span>
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4 group is-active ">
             <div class="relative w-full overflow-hidden">
              <input type="checkbox" class="absolute top-0 inset-x-0 w-full h-9 opacity-0 z-10 cursor-pointer peer" />
              <div class="w-full h-9 itemx-center flex flex-row border-b peer-checked:border-b-0">
                <span class="w-full font-normal text-base pb-1 items-center top-2">{filter.label}</span>
                <span class="absolute top-1 right-3 rotate-0  peer-checked:rotate-180 transition-transform duration-300">
                  <Icon id="ChevronDown" size={18} strokeWidth={2} />
                </span>
              </div>
              <div class="overflow-hidden max-h-0 transition-all duration-200 peer-checked:max-h-40">
               <FilterValues {...filter} />
             </div>
             </div>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
