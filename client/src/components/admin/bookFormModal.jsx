import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useBookAdminStore } from "../../stores/bookAdmin.Stores";

const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MiniAddModal = ({ title, placeholder, onSave, onClose }) => {
  const [name, setName] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    const success = await onSave(name);
    if (success) {
      toast.success(`${title} added successfully`);
      onClose();
    } else toast.error(`Failed to add ${title}`);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-sm">
        <h3 className="text-xl font-serif text-[#A56F6E] mb-4 text-center">
          Add New {title}
        </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-[#A56F6E] outline-none transition duration-150"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#A56F6E] text-white rounded-full text-sm hover:bg-[#8F5B5A] shadow-md transition duration-150"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const BookFormModal = ({ closeModal }) => {
  const {
    addOrEditBook,
    fetchSupportData,
    authors,
    publishers,
    series,
    categories,
    addAuthor,
    addPublisher,
    addSeries,
    addCategory,
  } = useBookAdminStore();

  const [form, setForm] = useState({
    Title: "",
    ISBN_No: "",
    ISSN_No: "",
    Publication_Year: "",
    No_of_Pages: "",
    Book_Summary: "",
    Language: "English",
    Series_ID: "",
    Publisher_ID: "",
    Author_IDs: [],
    Category_IDs: [],
  });

  const [loading, setLoading] = useState(false);
  const [miniModal, setMiniModal] = useState(null); // 'author' | 'publisher' | 'series' | 'category'

  useEffect(() => {
    // Fetch initial supporting data when the modal opens
    fetchSupportData();
  }, [fetchSupportData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleMultiSelect = (e) => {
    const { name, selectedOptions } = e.target;
    // Collect all selected values as an array of strings
    const values = Array.from(selectedOptions, (opt) => opt.value);
    setForm({ ...form, [name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Destructure the IDs for linking from the core form data
    const { Author_IDs, Category_IDs, ...coreForm } = form;

    // 2. Prepare the core book data payload for the API
    const bookDataForApi = {
      ...coreForm,
      // Convert to numbers or null/0
      No_of_Pages: parseInt(coreForm.No_of_Pages) || 0,
      Publication_Year: coreForm.Publication_Year ? parseInt(coreForm.Publication_Year) : null,
      
      // Ensure optional single selects are explicitly null if empty string
      Publisher_ID: coreForm.Publisher_ID || null,
      Series_ID: coreForm.Series_ID || null,
    };

    // 3. Call the updated store action, passing linking IDs as separate arguments
    const success = await addOrEditBook(
      bookDataForApi, 
      false, 
      null, 
      Author_IDs, 
      Category_IDs
    );

    if (success) {
      toast.success("Book added successfully and links processed!");
      closeModal();
    } else {
      // The store handles the specific error, just confirm failure here.
      toast.error("Failed to add book.");
    }

    setLoading(false);
  };

  const AddButton = ({ onClick, title }) => (
    <button
      type="button"
      onClick={onClick}
      className="text-[#A56F6E] hover:text-[#8F5B5A] transition-colors p-1 rounded-full hover:bg-gray-100 flex items-center justify-center"
      title={title}
    >
      <PlusIcon className="w-4 h-4" />
    </button>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 font-inter">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-center items-center p-5 border-b relative">
            <h2
              className="text-2xl font-serif text-center"
              style={{ color: "#A56F6E" }}
            >
              Add New Book
            </h2>
            <button
              onClick={closeModal}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-3xl transition-colors"
              title="Close"
            >
              &times;
            </button>
          </div>

          {/* Scrollable form */}
          <div className="overflow-y-auto px-8 pb-6 pt-5 flex-1">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-sm"
            >
              {/* Title */}
              <div className="col-span-2">
                <label className="block mb-1 text-gray-700 font-semibold">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Title"
                  value={form.Title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#A56F6E] outline-none transition duration-150"
                />
              </div>

              {/* Authors */}
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-700 font-semibold">Authors *</label>
                  <AddButton
                    onClick={() => setMiniModal("author")}
                    title="Add New Author"
                  />
                </div>
                <select
                  name="Author_IDs"
                  multiple
                  value={form.Author_IDs}
                  onChange={handleMultiSelect}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white h-32 focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                >
                  {authors.map((a) => (
                    <option key={a.Author_ID} value={a.Author_ID}>
                      {a.Author_Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Categories */}
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-700 font-semibold">
                    Categories *
                  </label>
                  <AddButton
                    onClick={() => setMiniModal("category")}
                    title="Add New Category"
                  />
                </div>
                <select
                  name="Category_IDs"
                  multiple
                  value={form.Category_IDs}
                  onChange={handleMultiSelect}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white h-32 focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                >
                  {categories.map((c) => (
                    <option key={c.Category_ID} value={c.Category_ID}>
                      {c.Category_Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publisher */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-700 font-semibold">Publisher</label>
                  <AddButton
                    onClick={() => setMiniModal("publisher")}
                    title="Add New Publisher"
                  />
                </div>
                <select
                  name="Publisher_ID"
                  value={form.Publisher_ID}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
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
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-700 font-semibold">Series</label>
                  <AddButton
                    onClick={() => setMiniModal("series")}
                    title="Add New Series"
                  />
                </div>
                <select
                  name="Series_ID"
                  value={form.Series_ID}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                >
                  <option value="">Select Series</option>
                  {series.map((s) => (
                    <option key={s.Series_ID} value={s.Series_ID}>
                      {s.Series_Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ISBN */}
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  ISBN No
                </label>
                <input
                  type="text"
                  name="ISBN_No"
                  value={form.ISBN_No}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                />
              </div>

              {/* ISSN */}
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  ISSN No
                </label>
                <input
                  type="text"
                  name="ISSN_No"
                  value={form.ISSN_No}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                />
              </div>

              {/* Year + Pages */}
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  Publication Year
                </label>
                <input
                  type="number"
                  name="Publication_Year"
                  value={form.Publication_Year}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  min="1000"
                  max={new Date().getFullYear()}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  No. of Pages *
                </label>
                <input
                  type="number"
                  name="No_of_Pages"
                  value={form.No_of_Pages}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                />
              </div>

              {/* Language */}
              <div className="col-span-1">
                <label className="block mb-1 text-gray-700 font-semibold">
                  Language *
                </label>
                <select
                  name="Language"
                  value={form.Language}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                >
                  {["English", "Hindi", "Sanskrit", "Other"].map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              {/* Summary */}
              <div className="col-span-2">
                <label className="block mb-1 text-gray-700 font-semibold">
                  Book Summary
                </label>
                <textarea
                  name="Book_Summary"
                  rows="4"
                  value={form.Book_Summary}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-1 focus:ring-[#A56F6E] transition duration-150"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 col-span-2 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-sm border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 text-sm bg-[#A56F6E] text-white rounded-full shadow-md hover:bg-[#8F5B5A] transition-all duration-150 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 🪟 Mini Add Modals */}
      {miniModal === "author" && (
        <MiniAddModal
          title="Author"
          placeholder="Enter Author Name"
          onSave={addAuthor}
          onClose={() => setMiniModal(null)}
        />
      )}
      {miniModal === "publisher" && (
        <MiniAddModal
          title="Publisher"
          placeholder="Enter Publisher Name"
          onSave={addPublisher}
          onClose={() => setMiniModal(null)}
        />
      )}
      {miniModal === "series" && (
        <MiniAddModal
          title="Series"
          placeholder="Enter Series Name"
          onSave={addSeries}
          onClose={() => setMiniModal(null)}
        />
      )}
      {miniModal === "category" && (
        <MiniAddModal
          title="Category"
          placeholder="Enter Category Name"
          onSave={addCategory}
          onClose={() => setMiniModal(null)}
        />
      )}
    </>
  );
};

export default BookFormModal;