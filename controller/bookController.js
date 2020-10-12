const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
Book = require('../model/bookModel');

// Handle index actions
exports.index = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Books retrieved successfully",
            data: books
        });
    });
};
// Handle create book actions
exports.new = [
    body('title').isLength({ min: 1 }).trim().withMessage('Title must be specified.'),
    sanitizeBody('title').trim(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.json({ book: req.body, errors: errors.array() });
            return;
        }

        var book = new Book();
        book.title = req.body.title ? req.body.title : book.title;
        book.author = req.body.author;
        // save the book and check for errors
        book.save(function (err) {
            // if (err)
            //     res.json(err);
            res.json({
                message: 'New book created!',
                data: book
            });
        });
    }
]
// Handle view book info
exports.view = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            message: 'Book details loading..',
            data: book
        });
    });
};
// Handle update book info
exports.update = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err)
            res.send(err);
        book.name = req.body.name ? req.body.name : book.name;
        book.author = req.body.author;
        // save the book and check for errors
        book.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Book Info updated',
                data: book
            });
        });
    });
};
// Handle delete book
exports.delete = function (req, res) {
    Book.remove({
        _id: req.params.book_id
    }, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Book deleted'
        });
    });
};