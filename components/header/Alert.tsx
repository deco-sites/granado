import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-[#025a44] flex md:flex-row flex-col md:h-[35px] w-full">
      <ul class="flex flex-row items-center md:pl-8">
        <li class="uppercase text-white text-center bg-[#004030] w-full h-full items-center px-5 py-[10px] leading-none font-medium  text-[14px]">
          <span class="tracking-widest ">Granado</span>
        </li>
        <li class="w-full text-center">
          <a
            class="px-5 py-[10px] text-white"
            href="https://www.phebo.com.br/phebo/?utm_source=home&amp;utm_medium=phebo&amp;utm_campaign=header"
            aria-label="phebo"
          >
            <span>PHEBO</span>
          </a>
        </li>
      </ul>
      <Slider class="carousel carousel-center w-full gap-6 py-1 md:py-0">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-white flex justify-center items-center w-screen h-full">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
