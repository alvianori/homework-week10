const MoviesRepository = require("../repository/moviesRepository");
const moviesRepository = new MoviesRepository();

const handleFileUpload = async (req, res) => {
  const movieId = req.body.movieId;
  try {
    // Lakukan validasi ID film di sini jika perlu.
    const movie = await moviesRepository.findMovieById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    // File berhasil diunggah, Anda dapat mengakses informasi file dengan req.file
    const { originalname, filename, path } = req.file;

    // Lakukan langkah-langkah selanjutnya seperti menyimpan nama file atau informasi file ke dalam basis data film (misalnya, menyimpan nama file di kolom 'photo' pada tabel film).
    movie.photo = filename;

    // Simpan perubahan model ke dalam basis data
    await movie.save();

    // Kemudian Anda dapat memberikan respons yang sesuai.
    res.status(200).json({
      message: "File berhasil diunggah dan disimpan ke dalam basis data",
      originalname,
      filename,
      path,
      movieId, // Menambahkan ID film dalam respons.
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
    console.log(error);
  }
};

module.exports = { handleFileUpload };
