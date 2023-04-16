const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
    },
  },
  thubnail: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
  nameEu: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);