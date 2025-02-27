import Book from "../models/Book.js";
import fs from "fs";
import path from "path";

// Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, category } = req.body;

    const coverImage = req.files?.coverImage
      ? `/uploads/${req.files.coverImage[0].filename}`
      : "";
    const pdf = req.files?.pdf ? `/uploads/${req.files.pdf[0].filename}` : "";

    if (!title || !author || !category || !coverImage || !pdf) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const book = new Book({
      title,
      author,
      category,
      coverImage,
      pdf,
    });

    await book.save();

    res.status(201).json({ success: true, message: "Book added", book });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Update book details
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.files?.coverImage) {
      updates.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }
    if (req.files?.pdf) {
      updates.pdf = `/uploads/${req.files.pdf[0].filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated",
      book: updatedBook,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, message: "Books retrieved", books });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Get a single book
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, message: "Book retrieved", book });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    const deleteFile = (filePath) => {
      if (filePath) {
        const fullPath = path.join("uploads", path.basename(filePath));
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    };

    deleteFile(book.coverImage);
    deleteFile(book.pdf);

    await Book.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Like a book
const likeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    if (book.likedBy.includes(userId))
      return res
        .status(400)
        .json({ success: false, message: "You have already liked this book" });

    book.likes += 1;
    book.likedBy.push(userId);
    await book.save();

    res.status(200).json({ success: true, message: "Book liked", book });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Unlike a book
const unlikeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    if (!book.likedBy.includes(userId))
      return res
        .status(400)
        .json({ success: false, message: "You have not liked this book" });

    book.likes -= 1;
    book.likedBy = book.likedBy.filter(
      (user) => user.toString() !== userId.toString()
    );
    await book.save();

    res.status(200).json({ success: true, message: "Book unliked", book });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

export {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  likeBook,
  unlikeBook,
};
