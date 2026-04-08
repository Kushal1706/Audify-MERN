import { usePlayer } from "../context/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AudioPlayer() {
  const { currentBook, isPlaying, progress, duration, togglePlay, seek } =
    usePlayer();
  if (!currentBook) return null;

  return (
    <div className="audio-player">
      <div className="player-info">
        <img
          src={currentBook.coverImage}
          alt={currentBook.title}
          className="player-cover"
        />
        <div className="player-text">
          <p className="player-title">{currentBook.title}</p>
          <p className="player-author">{currentBook.author}</p>
        </div>
      </div>

      <div className="player-controls">
        <button className="player-btn" onClick={togglePlay}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <div className="player-progress">
          <span className="player-time">{formatTime(progress)}</span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span className="player-time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
