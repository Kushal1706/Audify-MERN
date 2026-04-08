import Book from "../models/Book.js";

// GET all books (with optional search + category filter)
export async function getBooks(req, res) {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    const books = await Book.find(query)
      .populate("uploadedBy", "name")
      .sort({ created: -1 });

    res.json({ success: true, books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//GET single book by ID
export async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id).populate(
      "uploadedBy",
      "name"
    );

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//POST create new book(protected)
export async function createBook(req, res) {
  try {
    const {
      title,
      author,
      description,
      coverImage,
      audioUrl,
      duration,
      category,
    } = req.body;

    if (!title || !author || !coverImage || !audioUrl || !category) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields",
        });
    }

    const book = await Book.create({
      title,
      author,
      description,
      coverImage,
      audioUrl,
      duration,
      category,
      uploadedBy: req.userId,
    });

    res.status(201).json({ success: true, book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//PUT toggle like on a book(protected)
export async function toggleLike(req, res) {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    const alreadyLiked = book.likes.includes(req.userId);

    if (alreadyLiked) {
      book.likes.filter((id) => id.toString() !== req.userId);
    } else {
      book.likes.push(req.userId);
    }

    await book.save();
    res.json({ success: true, liked: !alreadyLiked, likes: book.likes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//GET books liked by current user(protected)
export async function getLikedBooks(req,res){
  try{
    const books=await Book.find({
      likes: req.userId
    }).populate("uploadedBy", "name");

    res.json({success: true, books});
  } catch(error){
    res.status(500).json({success: false, message:"Server error."});
  }
}

//GET books uploaded by current user(protected)
export async function getMyBooks(req,res){
  try{
    const books=await Book.find({
      uploadedBy: req.userId
    }).populate("uploadedBy", "name");

    res.json({success: true, books});
  }catch(error){
    res.status(500).json({success: false, message:"Server error."});
  }
}