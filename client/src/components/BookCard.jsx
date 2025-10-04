import { useNavigate } from 'react-router';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white rounded-lg 
                 hover:border-[#A56F6E] hover:shadow-lg transition-all duration-300 
                 transform hover:-translate-y-2 cursor-pointer flex flex-col"
      onClick={() => navigate(`/books/${book.Book_ID}`)}
    >
      {/* Book Cover with Category Tags */}
      <div className="w-full h-64 overflow-hidden relative rounded-t-lg">
        <img
          src={`/unzipped_books/${book.Book_ID}.jpg`}
          alt={`Cover of ${book.Title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x600/F0F0F0/A56F6E?text=Cover+Unavailable';
          }}
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          {book.Categories &&
            book.Categories.split(',').map((category, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-full text-xs font-medium text-white border border-gray-400 bg-gray-900 whitespace-nowrap shadow-sm"
              >
                {category.trim()}
              </span>
            ))}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#F2F0EF]">
        <div className="flex flex-col flex-grow">
          <h3 className="font-serif text-lg font-medium text-gray-900 break-words mb-2 line-clamp-2 leading-[1.2em]">
            {book.Title}
          </h3>
          <p className="text-sm font-sans text-gray-600 mb-2">By {book.Authors}</p>
        </div>
        <div className="mt-auto">
          <p className="text-sm font-sans text-gray-500">
            <span className="font-semibold text-gray-700">Published: </span>
            <span className="text-gray-600">{book.Publication_Year}</span>
          </p>
          <p className="text-sm font-sans text-gray-500">
            <span className="font-semibold text-gray-700">Pages: </span>
            <span className="text-gray-600">{book.No_of_Pages}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
