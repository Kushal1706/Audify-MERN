import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile, createBook } from "../services/bookService";

const CATEGORIES = [
  "Finance", "Self Help", "Business", "Science",
  "History", "Fiction", "Technology", "Psychology",
  "Biography", "Mystery", "Thriller", "Romance",
  "Fantasy", "Science Fiction", "Horror",
  "Non-Fiction", "Young Adult", "Children's",
];

function UploadPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!title || !author || !category) {
      setError("Title, author and category are required.");
      return;
    }
    if (!coverFile || !audioFile) {
      setError("Please select both a cover image and audio file.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      setProgress("Uploading cover image...");
      const coverData = await uploadFile(coverFile, "cover");

      setProgress("Uploading audio file... this may take a moment");
      const audioData = await uploadFile(audioFile, "audio");

      setProgress("Saving book...");
      await createBook({
        title,
        author,
        description,
        category,
        duration,
        coverImage: coverData.url,
        audioUrl: audioData.url,
      });

      setProgress("Done!");
      navigate("/browse");

    } catch (err) {
      console.log("Submit error:", err);
      setError(
        err.response?.data?.message || "Upload failed. Try again."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="page">
      <div className="upload-container">
        <h1 className="section-title">Upload Audiobook</h1>

        <div className="upload-grid">

          {/* Left — Cover preview */}
          <div className="upload-cover-side">
            <div className="cover-preview">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" />
              ) : (
                <div className="cover-placeholder">
                  <span>Cover Image</span>
                </div>
              )}
            </div>
            <label className="upload-file-label">
              Choose Cover Image
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                hidden
              />
            </label>
            <label className="upload-file-label audio-label">
              Choose Audio File
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                hidden
              />
            </label>
            {audioFile && (
              <p className="file-selected">
                ✓ {audioFile.name}
              </p>
            )}
          </div>

          {/* Right — Book details */}
          <div className="upload-details-side">
            <div className="input-group">
              <label className="input-label">Title *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Author *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Category *</label>
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Duration</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. 6h 30m"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea
                className="input-field textarea"
                placeholder="Brief description of the book"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {error && <p className="auth-error">{error}</p>}
            {progress && (
              <p className="upload-progress">{progress}</p>
            )}

            <button
              className="btn-auth"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? progress : "Upload Audiobook"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UploadPage;