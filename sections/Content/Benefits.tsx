import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    icon: AvailableIcons;
    description: string;
  }>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [{
      icon: "Parcelamento",
      label: "PARCELAMENTO EM ATÉ 10X",
      description: "COM MÍNIMO DE R$30",
    }, {
      icon: "Frete",
      label: "FRETE GRÁTIS",
      description: "NAS COMPRAS ACIMA DE R$150",
    }, {
      icon: "Aniversario",
      label: "15% DE DESCONTO NO MÊS DO SEU ANIVERSÁRIO",
      description: "NÃO CUMULATIVO, MEDIANTE A CADASTRO",
    },
    {
      icon: "Desconto",
      label: "15% DE DESCONTO",
      description: "EM SUA PRIMEIRA COMPRA NO SITE CUPOM BEMVINDO15 NÃO CUMULATIVO",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-white text-black p-4 lg:px-8 lg:py-4" : ""
        } flex gap-4 ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } `}
      >
        <div class="flex-none w-full flex justify-center">
          <Icon
            id={benefit.icon}
            class="text-[#025a44]"
            width={36}
            height={36}
            strokeWidth={2}
           
          />
        </div>
        <div class="flex-auto flex flex-col gap-1 lg:gap-2">
          <div
            class={`text-sm font-semibold uppercase ${
              reverse ? "text-black" : "text-base-content"
            }`}
          >
            {benefit.label}
          </div>
          <p
            class={` text-xs uppercase ${
              reverse ? "text-black" : "text-neutral"
            } ${benefitLayout == "piledup" ? "hidden lg:block" : ""}`}
          >
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="w-full flex justify-center">
              <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full lg:gap-8 lg:grid-flow-col lg:auto-cols-fr max-w-[1340px]">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
