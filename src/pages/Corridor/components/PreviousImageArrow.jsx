import React from "react";
import CarouselPreviousArrow from "../../../assets/icons/CarouselPreviousArrow";
function PreviousImageArrow({ imagesLength, carousel, carouselSetter }) {
  return (
    <>
      {imagesLength != 1 && carousel != 0 && (
        <div
          onClick={() => {
            carouselSetter(carousel - 1);
          }}
          className="absolute left-[10px] top-1/2 -translate-y-1/2 cursor-pointer z-50 hidden group-hover:block"
        >
          <CarouselPreviousArrow />
        </div>
      )}
    </>
  );
}

export default PreviousImageArrow;
