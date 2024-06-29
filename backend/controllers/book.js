import { db } from "../db.js";

export const getBooks = (req, res) => {
    const q = "SELECT * FROM bookdetails b INNER JOIN bookcategory c ON b.CategoryId = c.CategoryId";
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
}

export const createNewBook = (req, res) => {
    const q = "INSERT INTO bookdetails (`BookISBNNumber`, `BookName`, `BookPrice`, `AuthorName`, `PublisherName`, `BookEdition`, `BookLanguage`, `BookImage`, `CategoryId`) VALUES (?)";

    const values = [
        req.body.BookISBNNumber,
        req.body.BookName,
        req.body.BookPrice,
        req.body.AuthorName,
        req.body.PublisherName,
        req.body.BookEdition,
        req.body.BookLanguage,
        req.body.BookImage,
        req.body.CategoryId
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const updateBook = (req, res) => {
    const query = "UPDATE bookdetails SET ? WHERE ?";

    db.query(query, [req.body, req.params], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const deleteBook = (req, res) => {
    const bookId = req.params.BookISBNNumber;
    console.log(bookId)
    const q = "DELETE FROM bookdetails WHERE BookISBNNumber = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

// For get one particular book detail
export const getBook = (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM bookdetails b INNER JOIN bookcategory c ON b.CategoryId = c.CategoryId WHERE BookISBNNumber = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const searchBook = (req, res) => {
    const q = 'SELECT * FROM bookdetails b INNER JOIN bookcategory c ON b.CategoryId = c.CategoryId WHERE CONCAT(BookISBNNumber,BookName,AuthorName,PublisherName,CategoryName) LIKE ? ';

    db.query(q, '%' + req.params.key + '%', (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}