

const Buttons = [
    {text: "Detalhes", selected: true},
    {text: "Como usar", selected: false},
    {text: "Mais informações", selected: false},
    {text: "Avaliações(7)", selected: false},
]

const ProductDescription = () => {
    return(
    <div>
        <div>
            {Buttons.map((btn) => <button onClick={() => btn.selected == true} class={`px-[26px] py-4 text-base ${btn.selected ? "bg-[#f6f3f8] text-black" : "bg-white text-[#333] hover:text-black"}`}>{btn.text}</button>)}
        </div>
        <div  class="bg-[#f6f3f8] p-8 text-sm rounded-sm">
        A coleção de perfumes Vintage apresenta fragrâncias sofisticadas e atemporais, que carregam o DNA da Granado. Cada fragrância desperta memórias e nos leva a uma jornada pela centenária história da marca através da perfumaria, descobrindo um novo capítulo a cada nota olfativa.

Infusão Botânica tem um frescor inusitado e intrigante. Suas notas especiadas e aromáticas dão muita personalidade à criação e o transformam numa fragrância revigorante, que conecta com a natureza pelos seus ingredientes naturais. O fundo confortável fica por conta das notas amadeiradas de cashmeran e vetiver. É o equilíbrio perfeito entre frescor e conforto!

A arte da embalagem traz ingredientes da perfumaria em uma luxuosa trama em estilo art nouveau aplicada em hot stamping dourado, que ilumina a ilustração e o destaca de todos os outros produtos da linha Vintage. Dentro da caixa, um texto conceitual conta a história e inspiração do perfume.

Produzida com um álcool extra neutro, que é mais puro e não interfere na fragrância, a eau de parfum também passa pelo processo de maceração de perfume, prática feita por um seleto grupo de perfumarias no mundo, que garante maior harmonização e amadurecimento das notas olfativas da fragrância. Produto vegano. Não testado em animais. Conteúdo: 75ml.

Família e Pirâmide Olfativa: Amadeirado Especiado Aromático

Notas de topo: semente de coentro*, pimenta preta e limão*

Notas de corpo: notas verdes*, cardamomo e peônia

Notas de fundo: cashmeran, musk e vetiver*

*óleos naturais
        </div>
    </div>
    )
}

export default ProductDescription;