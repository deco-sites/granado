import { useEffect } from "preact/hooks";

export interface Props{
    rootId: string;
}

const setup = ({ rootId }: Props) => {
    const root = document.getElementById(rootId);
   
    if (!root ) {
        console.warn(
          "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
          { root },
        );
    
        return;
    }

    const animeScroll = () => {
        const windowTop = window.pageYOffset + window.innerHeight * 0.85
        
        if(windowTop > root.offsetTop){
            root.style.transform = "translate3d(0, -50px, 0px)"
            root.style.opacity = "1"
            root.style.paddingBottom = "0px"
        }
    }
    window.addEventListener("scroll", () => animeScroll());
}

const AnimationJS = ({rootId}: Props) => {
    useEffect(() => setup({ rootId }), [
        rootId
      ]);
    return(<div data-animation-controler/>)
}

export default AnimationJS;