import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";

function ProductSlider({products}) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={20}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      className="w-full !p-10"
    >
        {products.map((item,i) => {
            return(
                <SwiperSlide key={i} className="h-auto">
                    <ProductCard item={item}/>
                </SwiperSlide>
                
            )
        })}
    </Swiper>
  );
}

export default ProductSlider;