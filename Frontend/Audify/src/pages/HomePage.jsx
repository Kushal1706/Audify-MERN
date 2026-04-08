import {useState, useEffect} from "react";
import {fetchBooks} from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import {usePlayer} from "../context/PlayerContext";
import BookCard from "../components/BookCard";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const {playBook, currentBook, isPlaying} = usePlayer();

  useEffect(() => {
    async function loadBooks(){
      try{
        const data = await fetchBooks();
        setBooks(data);
      } catch(err){
        setError("Failed to load books. Please try again later.");
      }finally{
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  if(loading) return <div className="page"><p className="loading-text">Loading books...</p></div>;
  if(error) return <div className="page"><p className="error-text">{error}</p></div>;

  return (
    <div className="page">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Hi <span className="user-name">{user?.name.split(" ")[0]}</span>, Ready to Listen?</h1>
        <p className="hero-sub">
          Discover the world's best audiobooks.
        </p>
      </div>

      {/* Books Section */}
      <div className="section">
        <h2 className="section-title">Trending Now</h2>
        {books.length === 0 ? (
          <p className="loading-text">No books yet. Add some!</p>
        ) : (
          <div className="cards-grid">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
