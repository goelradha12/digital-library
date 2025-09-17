import Slider from 'react-slick';
import BookCard from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                 bg-black/60 text-white p-3 rounded-full 
                 shadow-lg hover:bg-cyan-500 hover:text-black transition"
    >
      <ChevronRight size={28} />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                 bg-black/60 text-white p-3 rounded-full 
                 shadow-lg hover:bg-cyan-500 hover:text-black transition"
    >
      <ChevronLeft size={28} />
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
      { breakpoint: 1536, settings: { slidesToShow: 4 } }, // 2xl screens
      { breakpoint: 1280, settings: { slidesToShow: 4 } }, // xl
      { breakpoint: 1024, settings: { slidesToShow: 3 } }, // lg
      { breakpoint: 768, settings: { slidesToShow: 2 } },  // md
      { breakpoint: 480, settings: { slidesToShow: 1 } },  // sm
    ],
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-950 via-black to-gray-950 py-12">
      <div className="container mx-auto max-w-7xl px-6 relative">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index} className="px-2">
              <BookCard book={book} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
