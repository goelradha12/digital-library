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
      <div id="book-overview" className="grid gap-4 grid-flow-col items-center">
        <div className="grid p-10 ">
          <span>
            {book.category.map((c) => {
              return (
                <span className="bg-gray-400 text-white rounded-full px-2 py-1 mr-2">{c}</span>
              );
            })}
          </span>
          <img src={book.coverImage} alt="" className="h-[40vw] py-6" />
          <div className="grid grid-cols-2">
            <span>{book.likes} Likes</span>
            <span>{book.downloads} Downloads</span>
          </div>
        </div>
        <div className="py-10">
          <div className="p-10 border-l-1 border-gray-400 grid align-middle">
            <h1 className="text-3xl">{book.title}</h1>
            <p>{book.Author.map((a) => a.Author_Name).join(', ')}</p>
            <div className="py-2 flex items-center">
              <span className="pr-2">
                {book.reviews.reduce((total, review) => total + review.Rating, 0) /
                  book.reviews.length}
              </span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i <
                    Math.floor(
                      book.reviews.reduce((total, review) => total + review.Rating, 0) /
                        book.reviews.length
                    )
                      ? '\u2605'
                      : '\u2606'}
                  </span>
                ))}
                <span className="text-gray-600 pl-2">
                  {'('}
                  {book.reviews.length} Reviews{')'}
                </span>
              </div>
            </div>
            <div className="py-5">
              <h2 className="text-xl pb-2">Overview</h2>
              <span className="max-w-2xs">{book.bookSummary}</span>
            </div>
            <div className="py-5 grid">
              <h2 className="text-xl pb-2">Details</h2>
              <span>
                <span className="font-semibold">Publisher:</span> {book.publisher.PublisherName}
              </span>
              <span>
                <span className="font-semibold">Publication Date:</span> {book.publicationDate}
              </span>
              {book.ISBN_No ? (
                <span>
                  <span className="font-semibold">ISBN:</span> {book.ISBN_No}
                </span>
              ) : (
                <span>
                  <span className="font-semibold">ISBN:</span> N/A
                </span>
              )}
              {book.ISSN_No ? (
                <span>
                  <span className="font-semibold">ISSN:</span> {book.ISSN_No}
                </span>
              ) : (
                <span>
                  <span className="font-semibold">ISSN:</span> N/A
                </span>
              )}
              <span>
                <span className="font-semibold">Page Count:</span> {book.noOfPages}
              </span>
              <span>
                <span className="font-semibold">Language</span> {book.language}
              </span>
            </div>
            <div className="flex gap-5 items-center py-5">
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-sm">
                  Add to Downloads
                </button>
              </div>
              <div className="py-5 text-lg">
                <span className=" underline text-blue-500">Add to Wishlist</span> {'\u2764'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="book-authors" className="bg-gray-200">
        <div className="p-10">
          <h2 className="text-3xl text-center pb-5">Author</h2>
          <div className="">
            {book.Author.map((a) => {
              return (
                <div className="py-5 grid grid-flow-col gap-10 items-center max-w-4xl mx-auto">
                  <div>
                    <img
                      src={a.Author_Image}
                      alt={a.Author_Name}
                      className="h-40 w-40 object-cover rounded-full shadow-lg" 
                    />
                  </div>
                  <div className="grid gap-5">
                    <span className="text-2xl">{a.Author_Name}</span>
                    <p>{a.Author_Introduction}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div className="p-10">
          <h2 className="text-3xl text-center pb-5">Reviews</h2>
          <div className="grid grid-cols-3 gap-2">
            {book.reviews.map((r, idx) => (
              <div
                key={idx}
                className="p-6 my-4 rounded-2xl shadow-md bg-white text-center hover:shadow-lg transition"
              >
                {/* Reviewer Info */}
                <div className="mb-3">
                  <span className="text-xl font-semibold">{r.ReviewerName}</span>
                  <span className="block text-gray-500 text-sm">({r.Review_Date})</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 italic mb-4">{r.Review_Text}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 text-yellow-500 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < r.Rating ? '★' : '☆'}</span>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">({r.Rating}/5)</span>
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
