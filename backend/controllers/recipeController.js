import Recipe from '../models/Recipe.js';

const getRecipes = async (req, res, next) => {
  try {
    const { category, time, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (time) {
      if (time === 'lt30') query.cookingTime = { $lt: 30 };
      else if (time === '30to60') query.cookingTime = { $gte: 30, $lte: 60 };
      else if (time === 'gt60') query.cookingTime = { $gt: 60 };
      else if (time === 'lt60') query.cookingTime = { $lt: 60 };
      else if (time === '60plus') query.cookingTime = { $gt: 60 };
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { ingredients: regex }, { description: regex }];
    }

    const recipes = await Recipe.find(query).populate('createdBy', 'name').lean();

    const enriched = recipes.map((r) => ({
      ...r,
      averageRating: computeAverage(r.ratings),
    }));

    res.json(enriched);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('createdBy', 'name')
      .lean();

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    res.json({ ...recipe, averageRating: computeAverage(recipe.ratings) });
  } catch (error) {
    next(error);
  }
};

const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id })
      .populate('createdBy', 'name')
      .lean();
    const enriched = recipes.map((r) => ({
      ...r,
      averageRating: computeAverage(r.ratings),
    }));
    res.json(enriched);
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      category,
      cookingTime,
      difficulty,
      image,
    } = req.body;

    if (!title || !description || !ingredients || !instructions || !category || !cookingTime || !difficulty) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: Array.isArray(ingredients)
        ? ingredients.filter((i) => i && i.trim())
        : [],
      instructions: Array.isArray(instructions)
        ? instructions.filter((i) => i && i.trim())
        : [],
      category,
      cookingTime,
      difficulty,
      image: image || '',
      createdBy: req.user._id,
    });

    const populated = await recipe.populate('createdBy', 'name');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this recipe');
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe removed' });
  } catch (error) {
    next(error);
  }
};

const rateRecipe = async (req, res, next) => {
  try {
    const { value } = req.body;
    if (!value || value < 1 || value > 5) {
      res.status(400);
      throw new Error('Rating must be between 1 and 5');
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404);
      throw new Error('Recipe not found');
    }

    const existing = recipe.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existing) {
      existing.value = value;
    } else {
      recipe.ratings.push({ user: req.user._id, value });
    }

    await recipe.save();
    res.json({ message: 'Rating submitted', averageRating: computeAverage(recipe.ratings) });
  } catch (error) {
    next(error);
  }
};

const computeAverage = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.value, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

export {
  getRecipes,
  getRecipeById,
  getMyRecipes,
  createRecipe,
  deleteRecipe,
  rateRecipe,
};
