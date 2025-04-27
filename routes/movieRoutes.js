import express from 'express';
import {createMovie,getMovies,getMovieById,rateMovie} from '../controllers/movieController.js';
import  authenticate  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/:id/rate', authenticate, rateMovie);

export default router;

