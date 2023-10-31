const MoviesRepository = require("../repository/moviesRepository");

const moviesRepository = new MoviesRepository();

const getAllMovies = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || undefined;
    const response = await moviesRepository.findAllMovies(offset, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieID = req.params.id;
    const response = await moviesRepository.findMovieById(movieID);
    if (!response) return res.status(404).json({ msg: `Movie Not Found!` });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createMovie = async (req, res) => {
  const { id, title, genres, year } = req.body;
  try {
    const response = await moviesRepository.addMovie(id, title, genres, year);
    res.status(201).json({ msg: "Add Movie Successfully", user: response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateMovie = async (req, res) => {
  const movieID = req.params.id;
  const Movie = await moviesRepository.findMovieById(movieID);

  if (!Movie) return res.status(404).json({ msg: `Movie Not Found!` });

  const { id, title, genres, year } = req.body;
  function getValueOrOriginal(value, original) {
    return value === "" || value === null ? original : value;
  }

  const newId = getValueOrOriginal(id, Movie.id);
  const newTitle = getValueOrOriginal(title, Movie.title);
  const newGenres = getValueOrOriginal(genres, Movie.genres);
  const newYear = getValueOrOriginal(year, Movie.year);
  try {
    await moviesRepository.updateMovie(newId, newTitle, newGenres, newYear, movieID);
    res.status(200).json({ msg: `Movie With ID ${req.params.id} Updated` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const deleteMovie = async (req, res) => {
  const movieID = req.params.id;
  const Movie = await moviesRepository.findMovieById(movieID);
  if (!Movie) return res.status(404).json({ msg: `Movie Not Found!` });

  try {
    await moviesRepository.deleteMovie(movieID);
    res.status(200).json({ msg: `Movie With ID ${req.params.id} Deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
