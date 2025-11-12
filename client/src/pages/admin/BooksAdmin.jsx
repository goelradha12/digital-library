import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import BookFormModal from "../../components/admin/bookFormModal";

const BooksAdmin = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axiosInstance.get("/admin/books");
        setBooks(res.data);
      } catch {
        // mock data until backend route is ready
        setBooks([
          { Book_ID: 1, Title: "The Great Gatsby", Author: "F. Scott Fitzgerald" },
          { Book_ID: 2, Title: "Pride and Prejudice", Author: "Jane Austen" },
          { Book_ID: 3, Title: "1984", Author: "George Orwell" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/admin/books/${id}`);
      setBooks((prev) => prev.filter((b) => b.Book_ID !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <main className="flex-1 p-8 relative">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('/bookshelf-pattern.svg')",
            backgroundSize: "100px",
            opacity: 0.2,
            zIndex: 0,
          }}
        ></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-serif" style={{ color: "#A56F6E" }}>
              Manage Books
            </h1>
            <button
              onClick={() => {
                setEditBook(null);
                setShowModal(true);
              }}
              className="px-6 py-2 bg-[#A56F6E] text-white rounded-full shadow-md hover:bg-[#8F5B5A] transition-transform hover:scale-105"
            >
              + Add New Book
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="text-gray-600 italic">No books available.</p>
          ) : (
            <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-[#F8EAEA] text-[#A56F6E] text-left">
                  <th className="py-3 px-5 font-medium">Title</th>
                  <th className="py-3 px-5 font-medium">Author</th>
                  <th className="py-3 px-5 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.Book_ID} className="border-b border-gray-200">
                    <td className="py-3 px-5">{book.Title}</td>
                    <td className="py-3 px-5">{book.Authors? (book.Authors): ""}</td>
                    <td className="py-3 px-5 text-center space-x-3">
                      <button
                        onClick={() => handleDelete(book.Book_ID)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {showModal && (
        <BookFormModal
          closeModal={() => setShowModal(false)}
          bookToEdit={editBook}
          refreshBooks={(b) => setBooks(b)}
        />
      )}
    </div>
  );
};

export default BooksAdmin;
