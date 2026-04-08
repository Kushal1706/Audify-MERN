import { useState, useEffect } from "react";
import { fetchBooks } from "../services/bookService";
import { usePlayer } from "../context/PlayerContext";
import BookCard from "../components/BookCard";

const CATEGORIES = [
  "All",
  "Finance",
  "Self Help",
  "Business",
  "Science",
  "History",
  "Fiction",
  "Technology",
  "Psychology",
];

function BrowsePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { playBook, currentBook, isPlaying } = usePlayer();

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch books when search or category changes
  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const category =
          activeCategory === "All" ? "" : activeCategory;
        const data = await fetchBooks(debouncedSearch, category);
        setBooks(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [debouncedSearch, activeCategory]);

  return (
    <div className="page">
      <div className="browse-header">
        <h1 className="section-title">Browse Audiobooks</h1>

        <input
          type="text"
          className="search-input"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Searching...</p>
      ) : books.length === 0 ? (
        <p className="loading-text">No books found.</p>
      ) : (
        <div className="cards-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowsePage;