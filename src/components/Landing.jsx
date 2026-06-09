import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import landingImg from "../../src/assets/landing.png";
import landingImgTwo from "../../src/assets/landing-2.png";
import landingImgThree from "../../src/assets/landing-3.png";

function Landing() {
    return (
        <div className="h-screen w-full">
        <Swiper 
            pagination={{ dynamicBullets: true }} 
            modules={[Pagination]} 
            className="h-full w-full"
            style={{
                "--swiper-pagination-color": "#000000",
                "--swiper-pagination-bullet-inactive-color": "#000000",
                "--swiper-pagination-bullet-inactive-opacity": "0.5"
            }}
        >
        <SwiperSlide>
            <div className={`relative h-full w-full bg-cover bg-center flex items-center justify-center`}
            style={{
                backgroundImage: `url(${landingImg})`
            }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-4 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                        Premium Supplements
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                        Fuel your workouts and achieve your fitness goals with our top-tier protein powders and pre-workouts.
                    </p>
                    <a href="#products" className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer">
                        Shop Now
                    </a>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${landingImgTwo})`
            }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-4 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                        Delicious Flavors
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                        Experience the rich taste of Chocolate Hazelnut while hitting your protein macros effortlessly.
                    </p>
                    <Link to={"categories/whey-protien"} className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 cursor-pointer">
                        Discover Flavors
                    </Link>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${landingImgThree})`
            }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-4 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                        Unleash Your Potential
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                        Join thousands of athletes who trust our quality to take their performance to the next level.
                    </p>
                    <Link to={"service"} className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 flex gap-0.5 cursor-pointer">
                        Know Your Calories <Calculator/>
                    </Link>
                </div>
            </div>
        </SwiperSlide>
        </Swiper>
    </div>
    );
}

export default Landing;
