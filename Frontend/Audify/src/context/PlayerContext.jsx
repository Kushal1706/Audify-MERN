import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentBook, setCurrentBook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());
  const isPlayingRef = useRef(false);

  // Keep isPlayingRef in sync with isPlaying state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Track progress and events
  useEffect(() => {
    const audio = audioRef.current;

    function handleTimeUpdate() {
      setProgress(audio.currentTime);
    }
    function handleLoadedMetadata() {
      setDuration(audio.duration);
    }
    function handleEnded() {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setProgress(0);
    }

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Load and play when currentBook changes
  useEffect(() => {
    if (!currentBook) return;

    const audio = audioRef.current;
    audio.src = currentBook.audioUrl;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch((err) => {
          console.log("Autoplay blocked:", err);
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
    }
  }, [currentBook]);

  // togglePlay reads from ref — never stale
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
          })
          .catch((err) => console.log("Play failed:", err));
      }
    }
  }, []);

  function playBook(book) {
    if (!book.audioUrl) {
      alert("No audio available for this book yet.");
      return;
    }
    if (currentBook?._id === book._id) {
      togglePlay();
      return;
    }
    setCurrentBook(book);
  }

  function seek(time) {
    audioRef.current.currentTime = time;
    setProgress(time);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentBook,
        isPlaying,
        progress,
        duration,
        playBook,
        togglePlay,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}