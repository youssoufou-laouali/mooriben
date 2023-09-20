import React from "react";
import useSlider from "use-slider";
import { images } from "./Slider";

const PartenaireSlide = () => {
  const { ref } = useSlider({
    autoPlay: true,
    loop: true,
    slidesPerView: 3,
    duration: 3000,
    speed: 3000,
  });
  return (
    <div className="h-0">

    <div ref={ref}>
      {[...images, ...images].map((el, i) => (
        <div key={i}>
          <img src={el} className="h-full" alt={i} />
        </div>
      ))}
    </div>
    </div>

  );
};

export default PartenaireSlide;
