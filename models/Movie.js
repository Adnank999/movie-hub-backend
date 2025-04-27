import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    

    rating: {
      type: [Number],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.every((num) => num === 1);
        },
        message: "Each rating value must be 1",
      },
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    wishlist: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: [String],
      required: true,
    },
    ratings: [ratingSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
