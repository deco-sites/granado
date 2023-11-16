import Component from "$store/components/header/NavItem.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

function Island(props: SiteNavigationElement) {
  return <Component {...props} />;
}

export default Island;
