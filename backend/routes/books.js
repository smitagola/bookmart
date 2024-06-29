import express from "express";
import { getBooks, createNewBook, deleteBook, getBook, updateBook, searchBook } from "../controllers/book.js";

const router = express.Router();

//GET books details
router.get("/", getBooks);

//POST add new book
router.post("/new", createNewBook);

//DELETE a book
router.delete("/delete-book/:BookISBNNumber", deleteBook);

// UPDATE a book
router.patch("/update-book/:BookISBNNumber", updateBook);

// GET book details for particular book
router.get("/:id", getBook);

// SEARCH book by BookName,AuthorName,ISBNNumber,PublisherName
router.get("/search/:key", searchBook);

export default router;