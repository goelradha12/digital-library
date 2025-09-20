// CarouselSection.jsx
import Slider from 'react-slick';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 
                 bg-gray-200/80 backdrop-blur-sm text-gray-800 p-3 rounded-full 
                 shadow-lg hover:bg-[#A56F6E] hover:text-white transition"
    >
      <ChevronRight size={26} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 
                 bg-gray-200/80 backdrop-blur-sm text-gray-800 p-3 rounded-full 
                 shadow-lg hover:bg-[#A56F6E] hover:text-white transition"
    >
      <ChevronLeft size={26} />
    </button>
  );
}

export default function CarouselSection({ books }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerMode: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4 } }, // 2xl
      { breakpoint: 1280, settings: { slidesToShow: 4 } }, // xl
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // lg
      { breakpoint: 768, settings: { slidesToShow: 2 } }, // md
      { breakpoint: 480, settings: { slidesToShow: 1 } }, // sm
    ],
  };

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto max-w-7xl px-6 relative">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index} className="px-3 py-2">
              <BookCard book={book} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
