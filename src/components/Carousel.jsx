import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={images[i]} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb slick-custom",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((url, i) =>
                    <div key={i}>
                        <img className="w-[350px] lg:w-[450px] h-[350px] lg:h-[450px] object-contain" src={url} />
                    </div>
                )}
            </Slider>
        </div>
    );
}

export default Carousel;
