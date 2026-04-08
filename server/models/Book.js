import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "Unknown",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Psychology",
        "Science",
        "Self Help",
        "Finance",
        "Business",
        "Technology",
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Biography",
        "History",
        "Children's",
        "Young Adult",
        "Romance",
        "Thriller",
        "Horror",
      ],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    plays: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ title: "text", author: "text" });

const Book = mongoose.model("Book", bookSchema);

export default Book;