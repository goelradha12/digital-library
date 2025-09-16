import { useNavigate } from 'react-router';

export default function BookCard({ book }) {
  const navigate = useNavigate();
  return (
    <div className="h-80 w-64 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl transform transition hover:scale-105 hover:shadow-2xl mx-auto border border-white/20">
      <div className="flex flex-col items-center text-center h-full">
        <div
          className="h-60 w-full bg-cover bg-center rounded-t-2xl"
          style={{ backgroundImage: `url(${book.image})` }}
          title={book.Title}
        />

        <div className="flex flex-col justify-center flex-grow p-3">
          <h3
            className="font-bold text-xl drop-shadow-md truncate 
               bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 
               bg-clip-text text-transparent"
          >
            {book.Title}
          </h3>

          <p
            className="text-sm italic 
                bg-gradient-to-r from-purple-300 to-pink-400 
                bg-clip-text text-transparent drop-shadow-sm"
          >
            {book.Categories}
          </p>

          <p
            className="font-medium mt-1 
                bg-gradient-to-r from-yellow-300 to-orange-400 
                bg-clip-text text-transparent drop-shadow-sm"
          >
            {book.Authors}
          </p>
          <button onClick={() => navigate(`/books/${book.Book_ID}`)}>Know More</button>
        </div>
      </div>
    </div>
  );
}
