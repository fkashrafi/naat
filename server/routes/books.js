const express = require("express");
const { getBook, getBooks, postBooks,updateBook } = require('../controllers/books');
const router = express.Router();

// user login
router.get('/', getBooks);

router.get('/:id', getBook);

router.put('/',updateBook);

// addBook
router.post('/', postBooks);

// export default router;
module.exports = router;