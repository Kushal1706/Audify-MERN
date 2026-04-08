import { useState, useEffect } from "react";
import { fetchLikedBooks, fetchMyBooks } from "../services/bookService";
import { fetchRecommendations } from "../services/aiService";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";

const TABS = ["Liked Books", "My Uploads", "Recommended"];

function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Liked Books");
  const [likedBooks, setLikedBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [likedData, myData] = await Promise.all([
          fetchLikedBooks(),
          fetchMyBooks(),
        ]);
        setLikedBooks(likedData.books);
        setMyBooks(myData.books);
      } catch (err) {
        console.log("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  //Load recommendations when tab is clicked
  useEffect(() => {
    if (activeTab !== "Recommended") return;
    if (recommendations.length > 0) return;
    if (likedBooks.length === 0) return;

    async function loadRecommendations() {
      setRecsLoading(true);
      try {
        const data = await fetchRecommendations(
          likedBooks.map((b) => ({
            title: b.title,
            author: b.author,
          }))
        );
        setRecommendations(data.recommendations);
      } catch (err) {
        console.log("Recommendations load error:", err);
      } finally {
        setRecsLoading(false);
      }
    }
    loadRecommendations();
  }, [activeTab, likedBooks]);

  const displayedBooks =
    activeTab === "Liked Books"
      ? likedBooks
      : activeTab === "My Uploads"
      ? myBooks
      : [];

  return (
    <div className="page">
      {/* Profile header */}
      <div className="dashboard-header">
        <div className="dashboard-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="dashboard-info">
          <h1 className="dashBoard-name">{user?.name}</h1>
          <p className="dashboard-email">{user?.email}</p>
          <div className="dashboard-stats">
            <div className="stat">
              <span className="stat-number">{likedBooks.length}</span>
              <span className="stat-label">Liked</span>
            </div>
            <div className="stat">
              <span className="stat-number">{myBooks.length}</span>
              <span className="stat-label">Uploaded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="category-tabs" style={{ marginBottom: "24px" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`category-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : activeTab === "Recommended" ? (
        <div>
          {likedBooks.length === 0 ?(
            <p className="loading-text">
              Like some books first to get recommendations.
            </p>
          ): recsLoading ?(
            <div className="ai-loading">
              < div className="ai-spinner"/>
                <p>AI is finding books you'll love...</p>
            </div>
          ) : recommendations.length === 0 ? (
            <p className="loading-text">No Recommendations Yet.</p>
          ): (
            <div className="recommendations-grid">
            {recommendations.map((rec, index) => (
              <div key={index} className="rec-card">
                <div className="rec-initial">
                  {rec.title.charAt(0)}
                </div>
                <div className="rec-info">
                  <h3 className="rec-title">{rec.title}</h3>
                  <p className="rec-author">by {rec.author}</p>
                  <p className="rec-reason">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      ) : displayedBooks.length === 0 ? (
        <div className="dashboard-empty">
          <p>
            {activeTab === "Liked Books"
              ? "You haven't liked any books yet. Browse and like some!"
              : "You haven't uploaded any books yet."}
          </p>
        </div>
      ) : (
        <div className="cards-grid">
          {displayedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
