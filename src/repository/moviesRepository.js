const Movies = require("../models/movies");

class MoviesRepository {
  async findAllMovies(offset, limit) {
    return Movies.findAll({
      attributes: ["id", "title", "genres", "year", "photo"],
      offset: offset,
      limit: limit,
    });
  }

  async findMovieById(id) {
    return Movies.findOne({
      attributes: ["id", "title", "genres", "year", "photo"],
      where: {
        id,
      },
    });
  }

  async addMovie(id, title, genres, year, photo) {
    return Movies.create({
      id: id,
      title: title,
      genres: genres,
      year: year,
      photo: photo,
    });
  }

  async updateMovie(newId, newTitle, newGenres, newYear, movieID) {
    return Movies.update(
      {
        id: newId,
        title: newTitle,
        genres: newGenres,
        year: newYear,
      },
      { where: { id: movieID } }
    );
  }

  async deleteMovie(id) {
    return Movies.destroy({ where: { id } });
  }
}

module.exports = MoviesRepository;
