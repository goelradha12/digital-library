import { useState, useEffect } from "react";
import { useBookAdminStore } from "../../stores/bookAdmin.Stores";

const BookFormModal = ({ closeModal, bookToEdit }) => {
  const {
    addOrEditBook,
    fetchSupportData,
    authors,
    publishers,
    series,
    categories,
  } = useBookAdminStore();

  const [form, setForm] = useState({
    Title: "",
    Accession_No: "",
    ISBN_No: "",
    ISSN_No: "",
    Publication_Year: "",
    No_of_Pages: "",
    Book_Summary: "",
    Language: "English",
    Series_ID: "",
    Publisher_ID: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSupportData();
    if (bookToEdit) setForm(bookToEdit);
  }, [bookToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await addOrEditBook(form, !!bookToEdit, bookToEdit?.Book_ID);
    if (success) closeModal();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
        <h2
          className="text-xl font-serif text-center mb-4"
          style={{ color: "#A56F6E" }}
        >
          {bookToEdit ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {/* Title */}
          <div className="col-span-2">
            <label className="block mb-1 text-gray-600 font-medium">Title *</label>
            <input
              type="text"
              name="Title"
              value={form.Title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A56F6E] outline-none"
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">ISBN No</label>
            <input
              type="text"
              name="ISBN_No"
              value={form.ISBN_No}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* ISSN */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">ISSN No</label>
            <input
              type="text"
              name="ISSN_No"
              value={form.ISSN_No}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Publication Year */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Publication Year</label>
            <input
              type="number"
              name="Publication_Year"
              value={form.Publication_Year}
              onChange={handleChange}
              maxLength={4}
              placeholder="e.g. 2024"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Pages */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">No. of Pages *</label>
            <input
              type="number"
              name="No_of_Pages"
              value={form.No_of_Pages}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Language *</label>
            <select
              name="Language"
              value={form.Language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            >
              {["English", "Hindi", "Sanskrit", "Other"].map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Publisher */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Publisher</label>
            <select
              name="Publisher_ID"
              value={form.Publisher_ID}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Select Publisher</option>
              {publishers.map((p) => (
                <option key={p.Publisher_ID} value={p.Publisher_ID}>
                  {p.Publisher_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Series */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Series</label>
            <select
              name="Series_ID"
              value={form.Series_ID}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Select Series</option>
              {series.map((s) => (
                <option key={s.Series_ID} value={s.Series_ID}>
                  {s.Series_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div className="col-span-2">
            <label className="block mb-1 text-gray-600 font-medium">Book Summary</label>
            <textarea
              name="Book_Summary"
              rows="3"
              value={form.Book_Summary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 col-span-2 mt-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2 text-sm border border-gray-400 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm bg-[#A56F6E] text-white rounded-full shadow-sm hover:bg-[#8F5B5A] transition-transform hover:scale-105"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
