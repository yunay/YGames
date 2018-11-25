const Book = require('../models/book')

module.exports = {
    Query: {
        books: (parent, args) => Book.find({})
    }
};