import React, { useEffect, useRef, useState } from "react";

export const images = [
  "https://cdn.pixabay.com/photo/2015/10/22/17/45/leaf-1001679_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/04/17/23/26/environmental-protection-326923_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/05/20/38/fir-trees-2288229_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/07/24/21/58/lemon-5435158_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/04/22/02/04/maple-2250473_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/04/21/17/29/wood-2249363_1280.jpg",
];

let count = 0;
let slideInterval: any;
export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef: any = useRef();

  const removeAnimation = () => {
    slideRef?.current?.classList?.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % images.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };
  // const handleOnPrevClick = () => {
  //   const productsLength = images.length;
  //   count = (currentIndex + productsLength - 1) % productsLength;
  //   setCurrentIndex(count);
  //   slideRef.current.classList.add("fade-anim");
  // };

  return (
    <div ref={slideRef} className="w-full h-full select-none">
      <div className="w-full h-full aspect-w-16 aspect-h-9">
        <img src={images[currentIndex]} alt="" className="w-full h-full" />
      </div>
    </div>
  );
}
