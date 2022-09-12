import express from 'express';
import {
  register,
  login,
  getUser,
  addFavorite,
  removeFavorite,
  removeFavorites,
} from '../controllers/userControllers';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/:id', auth, getUser);
router.put('/users/add/favorite', auth, addFavorite);
router.put('/users/remove/favorite', auth, removeFavorite);
router.put('/users/remove/favorites', auth, removeFavorites);

export default router;
