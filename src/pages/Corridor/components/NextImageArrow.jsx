import React from "react";
import CarouselNextArrow from "../../../assets/icons/CarouselNextArrow";

function NextImageArrow({ imagesLength, carousel, carouselSetter }) {
  return (
    <>
      {imagesLength > 1 && carousel <= imagesLength - 2 && (
        <div
          onClick={() => {
            carouselSetter(carousel + 1);
          }}
          className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer z-50 hidden group-hover:block"
        >
          <CarouselNextArrow />
        </div>
      )}
    </>
  );
}

export default NextImageArrow;
