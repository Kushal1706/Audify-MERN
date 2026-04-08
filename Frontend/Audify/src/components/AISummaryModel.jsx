import { useState, useEffect } from "react";
import { fetchBookSummary } from "../services/aiService";

function AISummaryModal({ book, onClose }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadSummary() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBookSummary(
        book.title,
        book.author,
        book.description
      );
      setSummary(data.summary);
    } catch (err) {
      setError("Failed to generate summary. Try again.");
    } finally {
      setLoading(false);
    }
  }

  //Load summary when modal opens
  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-book-info">
            <img
              src={book.coverImage}
              alt={book.title}
              className="modal-cover"
            />
            <div>
                <h2 className="modal-title">{book.title}</h2>
                <p className="modal-author">by {book.author}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="ai-loading">
              <div className="ai-spinner" />
              <p>Generating AI summary...</p>
            </div>
          )}

          {error && (
            <div className="ai-error">
              <p>{error}</p>
              <button className="btn-primary" onClick={loadSummary}>
                Try Again
              </button>
            </div>
          )}

          {summary && (
            <div className="summary-content">
              <div className="summary-section">
                <h3 className="summary-label">Overview</h3>
                <p className="summary-text">{summary.overview}</p>
              </div>

              <div className="summary-section">
                <h3 className="summary-label">Key Themes</h3>
                <div className="theme-tags">
                  {summary.keyThemes.map((theme, i) => (
                    <span key={i} className="theme-tag">{theme}</span>
                  ))}
                </div>
              </div>

              <div className="summary-section">
                <h3 className="summary-label">Who Should Read This</h3>
                <p className="summary-text">{summary.targetAudience}</p>
              </div>

              <div className="summary-section">
                <h3 className="summary-label">Key Takeaway</h3>
                <p className="summary-text highlight-text">
                  "{summary.keyTakeaway}"
                </p>
              </div>

              <div className="summary-section">
                <h3 className="summary-label">AI Rating</h3>
                <p className="summary-text">{summary.rating}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AISummaryModal;
