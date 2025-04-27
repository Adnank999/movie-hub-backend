import Movie from "../models/Movie.js";
import { getIo } from "../socket.js";

export const createMovie = async (req, res) => {
  try {
    const { title, description, imageUrl, genre, wishlist } = req.body;

    if (!title || !description || !imageUrl || !genre) {
      return res.status(400).json({
        message: "Please provide title, description, imageUrl, and genre",
      });
    }

    const movie = new Movie({
      title,
      description,
      imageUrl,
      genre: Array.isArray(genre) ? genre : [genre],
      wishlist: wishlist || false,
      user: req.user.id,
    });

    await movie.save();

    const io = getIo();

    if (io) {
      io.emit("new-movie", "A new movie has been added to the list!");
    }

    res.status(201).json(movie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({
      message: "Server error while creating movie",
      error: error.message,
    });
  }
};

export const getMovies = async (req, res) => {
  //   console.log("Fetching movies req...",req);
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
};

export const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

export const rateMovie = async (req, res) => {
  try {
    const { rating } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const ratingArray = Array(rating).fill(1);

    movie.ratings = movie.ratings.filter(
      (r) => r.user.toString() !== req.user.id
    );

    movie.ratings.push({ user: req.user.id, rating: ratingArray });

    await movie.save();

    res.json(movie);

    const io = getIo();

    if (io) {
      io.emit("new-rating", "A User has rated a movie!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
