const express = require("express");
const router = express.Router();
const {getContacts, createContacts, getContact, updateContact, deleteContacts} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route('/').get(getContacts).post(createContacts);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContacts);

module.exports = router;