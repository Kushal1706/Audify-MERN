import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import { toggleLikeBook } from "../services/bookService";
import AISummaryModal from "./AISummaryModel";

function BookCard({ book }) {
  const { playBook, currentBook, isPlaying } = usePlayer();
  const { user } = useAuth();

  const [likes, setLikes] = useState(book.likes?.length || 0);
  const [liked, setLiked] = useState(book.likes?.includes(user?._id) || false);
  const [liking, setLiking] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const isCurrentlyPlaying = currentBook?._id === book._id && isPlaying;

  async function handleLike() {
    if (liking) return; // Prevent multiple clicks while processing
    setLiking(true);

    //optimistic UI update before API respons
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);

    try {
      await toggleLikeBook(book._id);
    } catch (err) {
      // Revert UI changes if API call fails
      setLiked(liked);
      setLikes(likes);
      console.error("Failed to toggle like:", err);
    } finally {
      setLiking(false);
    }
  }

  return (
    <>
      <div className="card" onClick={() => playBook(book)}>
        <div className="card-img-wrapper">
          <img src={book.coverImage} alt={book.title} className="card-img" />
          <button className="card-play-overlay" onClick={() => playBook(book)}>
            {isCurrentlyPlaying ? "⏸" : "▶"}
          </button>
        </div>

        <div className="card-info">
          <span className="card-category">{book.category}</span>
          <h3 className="card-title">{book.title}</h3>
          <p className="card-author">{book.author}</p>

          <div className="card-footer">
            <span className="card-duration">{book.duration}</span>
            <button
              className={`like-btn ${liked ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              {liked ? "❤️" : "🤍"} {likes}
            </button>
          </div>
          <button
            className="btn-ai"
            onClick={(e) => {
              e.stopPropagation();
              setShowAI(true);
            }}
          >
            ✦ AI Summary
          </button>
        </div>
      </div>

      {showAI && (
        <AISummaryModal book={book} onClose={() => setShowAI(false)} />
      )}
    </>
  );
}

export default BookCard;
