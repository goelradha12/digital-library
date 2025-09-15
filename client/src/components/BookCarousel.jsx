
import Slider from "react-slick";
import BookCard from "./BookCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"


function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                 bg-white/10 backdrop-blur-md text-white p-3 rounded-full 
                 shadow-lg hover:bg-cyan-400/80 hover:text-black transition"
    >
      <ChevronRight size={24} />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                 bg-white/10 backdrop-blur-md text-white p-3 rounded-full 
                 shadow-lg hover:bg-cyan-400/80 hover:text-black transition"
    >
      <ChevronLeft size={24} />
    </button>
  );
}

export default function CarouselSection({ books }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
     <div className="flex-grow flex items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        <div className="max-w-6xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-white/10">

    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black py-14">
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index} className="px-3">
              <BookCard book={book} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </div>
    </div>
  );
}
