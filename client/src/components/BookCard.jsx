import { useNavigate } from 'react-router';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-64 h-96 bg-gray-900 rounded-2xl shadow-md 
                 hover:shadow-xl transition-transform transform 
                 hover:-translate-y-2 overflow-hidden 
                 border border-gray-700 flex flex-col"
    >
      {/* Cover */}
      <div
        className="h-2/3 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(/unzipped_books/${book.Book_ID}.jpg)`,
        }}
        title={book.Title}
      />

      {/* Info */}
      <div className="flex flex-col flex-grow justify-between p-4 text-center">
        <div>
          <h3 className="font-semibold text-lg text-white truncate">
            {book.Title}
          </h3>
          <p className="text-sm text-purple-300 italic truncate">
            {book.Categories}
          </p>
          <p className="text-sm font-medium text-gray-300 mt-1 truncate">
            {book.Authors}
          </p>
        </div>

        <button
          onClick={() => navigate(`/books/${book.Book_ID}`)}
          className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 
                     hover:from-cyan-600 hover:to-blue-700 
                     text-white text-sm font-medium rounded-lg shadow 
                     transition-colors"
        >
          Know More
        </button>
      </div>
    </div>
  );
}
