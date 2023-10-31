const express = require("express");
const Movies = require("../controller/moviesController");
const { handleFileUpload } = require("../controller/uploadPhotoMovie");
const upload = require("../middleware/multer");
const router = express.Router();

router.get("/", Movies.getAllMovies);
router.get("/:id", Movies.getMovieById);
router.post("/", Movies.createMovie);
router.patch("/:id", Movies.updateMovie);
router.delete("/:id", Movies.deleteMovie);
router.post("/upload", upload.single("photo"), handleFileUpload);

module.exports = router;
