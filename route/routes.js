let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import book controller
var bookController = require('../controller/bookController');
// Book routes
router.route('/books')
    .get(bookController.index)
    .post(bookController.new);
router.route('/books/:book_id')
    .get(bookController.view)
    .patch(bookController.update)
    .put(bookController.update)
    .delete(bookController.delete);
// Export API routes
module.exports = router;