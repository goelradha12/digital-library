import React from 'react';
import bookImage from '../assets/bookPage/harryPotter2.jpg';
import authorImage from '../assets/bookPage/jk-rowling.jpg';

const BookPage = () => {
  const book = {
    title: 'Harry Potter and the Chamber of Secrets',
    Author: [
      {
        Author_Name: 'J.K. Rowling',
        Author_Image: authorImage,
        Author_Introduction:
          'Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J.K. Rowling, is a British author, screenwriter, and philanthropist best known for writing the Harry Potter fantasy series. The books have gained worldwide attention, won numerous awards, and sold more than 500 million copies. Rowling has also written several companion books to the series, including "Fantastic Beasts and Where to Find Them" and "The Tales of Beedle the Bard".',
      },
    ],
    ISBN_No: '9780747532743',
    ISSN_No: '',
    publicationYear: 1998,
    coverImage: bookImage,
    noOfPages: 341,
    bookSummary:
      'The Chamber of Secrets is a fantasy novel written by J.K. Rowling and the second book in the Harry Potter series. The story follows Harry Potter, a young wizard, and his friends Ron Weasley and Hermione Granger as they try to uncover the truth about a mysterious Chamber of Secrets at Hogwarts School of Witchcraft and Wizardry.',
    language: 'English',
    series: {
      SeriesID: 1,
      SeriesName: 'Harry Potter',
      Series_Description:
        'Harry Potter is a series of fantasy novels written by J.K. Rowling. The novels follow the adventures of a young wizard named Harry Potter and his friends at Hogwarts School of Witchcraft and Wizardry. The series is a critical and commercial success, with over 500 million copies sold worldwide. The novels are known for their imaginative storylines, memorable characters, and themes of friendship, love, and the struggle between good and evil.',
    },
    publisher: {
      PublisherID: 1,
      PublisherName: 'Scholastic Press',
    },
    publicationDate: '1998-07-02',
    category: ['Adventure', 'Fantasy'],
    likes: 500,
    downloads: 100,
    reviews: [
      {
        ReviewID: 1,
        ReviewerName: 'John Doe',
        Rating: 4.5,
        Review_Date: '2022-01-01',
        Review_Text: 'This book was amazing!',
      },
      {
        ReviewID: 2,
        ReviewerName: 'Jane Doe',
        Rating: 4.8,
        Review_Date: '2022-01-05',
        Review_Text:
          'I loved this book! The characters were so relatable and the story was engaging.',
      },
      {
        ReviewID: 3,
        ReviewerName: 'Bob Smith',
        Rating: 4.2,
        Review_Date: '2022-01-10',
        Review_Text:
          'This book was okay. I liked the plot, but the characters were not as developed as I would have liked.',
      },
      {
        ReviewID: 4,
        ReviewerName: 'Alice Johnson',
        Rating: 4.9,
        Review_Date: '2022-01-15',
        Review_Text:
          'This book was amazing! I loved the characters and the story was so engaging. I could not put it down!',
      },
      {
        ReviewID: 5,
        ReviewerName: 'Mike Brown',
        Rating: 4.1,
        Review_Date: '2022-01-20',
        Review_Text:
          'This book was good. I liked the plot, but the characters were not as developed as I would have liked.',
      },
    ],
  };

  return (
    <>
      {/* --- Book Overview --- */}
      <div id="book-overview" className="flex flex-col lg:grid lg:grid-flow-col lg:items-center">
        <div className="grid p-6 md:p-10">
          <div className="mb-2 flex flex-wrap gap-2">
            {book.category.map((c, idx) => (
              <span key={idx} className="bg-gray-400 text-white rounded-full px-3 py-1 text-sm">
                {c}
              </span>
            ))}
          </div>
          <img
            src={book.coverImage}
            alt=""
            className="w-full max-w-xs md:max-w-sm lg:h-[40vw] mx-auto py-4"
          />
          <div className="grid grid-cols-2 gap-4 text-center mt-2">
            <span>{book.likes} Likes</span>
            <span>{book.downloads} Downloads</span>
          </div>
        </div>

        {/* Right side */}
        <div className="py-6 md:py-10">
          <div className="px-6 md:p-10 border-t lg:border-t-0 lg:border-l border-gray-300 grid gap-4">
            <h1 className="text-2xl md:text-3xl">{book.title}</h1>
            <p className="text-gray-700">{book.Author.map((a) => a.Author_Name).join(', ')}</p>

            {/* Ratings */}
            <div className="py-2 flex flex-wrap items-center">
              <span className="pr-2">
                {(
                  book.reviews.reduce((total, r) => total + r.Rating, 0) / book.reviews.length
                ).toFixed(1)}
              </span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i <
                    Math.floor(book.reviews.reduce((t, r) => t + r.Rating, 0) / book.reviews.length)
                      ? '★'
                      : '☆'}
                  </span>
                ))}
                <span className="text-gray-600 pl-2">({book.reviews.length} Reviews)</span>
              </div>
            </div>

            {/* Overview */}
            <div className="py-3">
              <h2 className="text-lg md:text-xl pb-1">Overview</h2>
              <p className="text-gray-700">{book.bookSummary}</p>
            </div>

            {/* Details */}
            <div className="py-3 grid gap-1">
              <h2 className="text-lg md:text-xl pb-1">Details</h2>
              <span>
                <span className="font-semibold">Publisher:</span> {book.publisher.PublisherName}
              </span>
              <span>
                <span className="font-semibold">Publication Date:</span> {book.publicationDate}
              </span>
              <span>
                <span className="font-semibold">ISBN:</span> {book.ISBN_No || 'N/A'}
              </span>
              <span>
                <span className="font-semibold">ISSN:</span> {book.ISSN_No || 'N/A'}
              </span>
              <span>
                <span className="font-semibold">Page Count:</span> {book.noOfPages}
              </span>
              <span>
                <span className="font-semibold">Language:</span> {book.language}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center py-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                Add to Downloads
              </button>
              <div className="text-lg">
                <span className="underline text-blue-500">Add to Wishlist</span> ❤️
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Authors --- */}
      <div id="book-authors" className="bg-gray-200">
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center pb-5">Author</h2>
          <div className="flex flex-col gap-6">
            {book.Author.map((a, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto p-10 rounded-lg shadow"
              >
                <img
                  src={a.Author_Image}
                  alt={a.Author_Name}
                  className="h-32 w-32 md:h-40 md:w-40 object-cover rounded-full shadow-lg"
                />
                <div className="text-center md:text-left grid gap-2">
                  <span className="text-xl md:text-2xl font-semibold">{a.Author_Name}</span>
                  <p className="text-gray-700 text-sm md:text-base">{a.Author_Introduction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Reviews --- */}
      <div>
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center pb-5">Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {book.reviews.map((r, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl shadow-md bg-white text-center hover:shadow-lg transition"
              >
                <div className="mb-3">
                  <span className="text-lg md:text-xl font-semibold">{r.ReviewerName}</span>
                  <span className="block text-gray-500 text-xs md:text-sm">({r.Review_Date})</span>
                </div>

                <p className="text-gray-700 italic text-sm md:text-base mb-4">{r.Review_Text}</p>

                <div className="flex items-center justify-center gap-1 text-yellow-500 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < r.Rating ? '★' : '☆'}</span>
                  ))}
                  <span className="ml-2 text-gray-600 text-xs md:text-sm">({r.Rating}/5)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
