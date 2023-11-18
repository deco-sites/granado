

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
        Gengibre tem uma fragrância cítrica, especiada e intensa. A raiz é reconhecida na medicina chinesa como “remédio universal” devido suas diversas propriedades terapêuticas. Ideal também como vela aromática para deixar sua casa ainda mais cheirosa.<br></br><br></br>
        A Vela Perfumada Granado é feita artesanalmente com cera vegetal de carnaúba e alta concentração de perfume. Além de ter longa duração, perfumando por mais tempo, não libera fumaça escura e é um ótimo complemento na decoração.<br></br><br></br>
        A identidade visual da embalagem segue o padrão minimalista e delicado da linha Terrapeutics. O frasco de vidro fosco, com ilustração de flores, decora e cria uma atmosfera acolhedora no ambiente. Não contém ingredientes de origem animal. Conteúdo: 180g.  
        </div>
    </div>
    )
}

export default ProductDescription;