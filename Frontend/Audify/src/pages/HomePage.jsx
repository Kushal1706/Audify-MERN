function HomePage() {
  const books = [
    {
      id: 1,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
      duration: "6h 10m",
      category: "Finance",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
      duration: "5h 35m",
      category: "Self-Help",
    },
    {
      id: 3,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
      duration: "5h 48m",
      category: "Finance",
    },
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Your World of Audiobooks</h1>
        <p className="hero-sub">
          Listen to the world's best books. Anytime. Anywhere.
        </p>
        <button className="btn-primary">Browse Library</button>
      </div>

      {/* Books Section */}
      <div className="section">
        <h2 className="section-title">Trending Now</h2>
        <div className="cards-grid">
          {books.map((book) => (
            <div className="card" key={book.id}>
              <img src={book.cover} alt={book.title} className="card-img" />
              <div className="card-info">
                <span className="card-category">{book.category}</span>
                <h3 className="card-title">{book.title}</h3>
                <p className="card-author">{book.author}</p>
                <p className="card-duration">{book.duration}</p>
                <button className="btn-play">▶ Play</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
