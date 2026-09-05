import { Router } from 'express';
import {
  getRecipes,
  getRecipeById,
  getMyRecipes,
  createRecipe,
  deleteRecipe,
  rateRecipe,
} from '../controllers/recipeController.js';
import protect from '../middleware/auth.js';

const router = Router();

router.route('/').get(getRecipes).post(protect, createRecipe);
router.get('/mine', protect, getMyRecipes);
router.get('/:id', getRecipeById);
router.delete('/:id', protect, deleteRecipe);
router.post('/:id/rate', protect, rateRecipe);

export default router;
