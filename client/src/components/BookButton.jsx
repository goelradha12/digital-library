

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselButton({ direction = "left", disabled, onClick }) {
  const isLeft = direction === "left";
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${isLeft ? "left-2" : "right-2"} top-1/2 transform -translate-y-1/2 p-3 rounded-full z-10 shadow-md transition ${
        disabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-black/60 text-white hover:bg-black/80"
      }`}
    >
      <Icon />
    </button>
  );
}
