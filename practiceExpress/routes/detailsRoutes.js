//to handle all routes
const express = require("express");
const { 
    getDetails,
    createDetails,
    getDetail,
    updateDetails,
    deleteDetails
} = require("../controllers/detailController");

const router = express.Router();

router.route("/").post(createDetails).get(getDetails);

router.route("/:id").get(getDetail).put(updateDetails).delete(deleteDetails);

module.exports = router;