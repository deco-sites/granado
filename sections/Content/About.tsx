import Icon from "$store/components/ui/Icon.tsx";

/** @titleBy title */
export interface About{
    img?: "Fundacao" | "Lojas" | "Ambiente";
    text?: string;
}

export interface Props {
    title?: string;
    texts?: About[];
}


export default function About ({title, texts} : Props) {

    const Images = [
        {src:"https://www.granado.com.br/media/wysiwyg/Grupo_35.png"},
        {src:"https://www.granado.com.br/media/wysiwyg/Grupo_36.png"},
        {src:"https://www.granado.com.br/media/wysiwyg/Grupo_37.png"},
    ]

    return (
        <div class="bg-[#025a44] text-white ">
            <div class="py-[44px]">
             <h2 class="text-2xl lg:text-3xl font-medium  pl-8">
             {title}
             </h2>
             <div class="flex flex-col md:flex-row py-8">
                {texts.map((text) => (
                    <div class="px-12">
                        <img src={text.img == "Fundacao" ? Images[0].src : text.img == "Lojas" ? Images[1].src : Images[2].src} width={83} height={83}/> 
                        <p class="mt-4">
                         {text.text}
                        </p>
                    </div>
                ))}
             </div>
            </div>
        </div>
    )
}