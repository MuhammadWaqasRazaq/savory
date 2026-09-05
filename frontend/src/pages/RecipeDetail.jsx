import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Clock,
  ChefHat,
  Star,
  User,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { recipeService } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { CATEGORIES, DIFFICULTY_STYLES, MAX_RATING } from '../constants.js';
import { formatTime } from '../utils/format.js';
import { StarRating } from '../components/StarRating.jsx';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await recipeService.getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleRate = async (value) => {
    if (!user) {
      toast('Please log in to rate recipes', { icon: '🔒' });
      navigate('/login');
      return;
    }
    try {
      await recipeService.rateRecipe(id, value);
      toast.success('Thanks for rating!');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this recipe permanently?')) return;
    try {
      await recipeService.deleteRecipe(id);
      toast.success('Recipe deleted');
      navigate('/recipes');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="skeleton h-8 w-40 mb-8" />
        <div className="skeleton aspect-[16/8] rounded-3xl" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="skeleton h-64" />
          <div className="skeleton h-64" />
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <ChefHat size={48} className="mx-auto text-tomato-400" />
        <h1 className="mt-4 font-display text-2xl font-bold text-gray-900">
          {error || 'Recipe not found'}
        </h1>
        <Link to="/recipes" className="btn-secondary mt-6">
          <ArrowLeft size={18} /> Back to recipes
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[recipe.category];
  const difficultyStyle = DIFFICULTY_STYLES[recipe.difficulty];
  const isOwner = user && recipe.createdBy?._id === user._id;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/recipes"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition hover:text-tomato-600"
      >
        <ArrowLeft size={16} /> Back to recipes
      </Link>

      <div className="mt-6 animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${category.color}`}>
              {category.emoji} {category.label}
            </span>
          )}
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${difficultyStyle}`}>
            {recipe.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
            <Clock size={14} /> {formatTime(recipe.cookingTime)}
          </span>
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-5xl">
          {recipe.title}
        </h1>
        <p className="mt-2 text-lg text-gray-500">{recipe.description}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tomato-400 to-tomato-600 font-bold text-white">
              {recipe.createdBy?.name?.charAt(0).toUpperCase() || '?'}
            </span>
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <User size={13} className="text-gray-400" /> Shared by {recipe.createdBy?.name || 'Unknown'}
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <StarRating value={recipe.averageRating} size={15} />
                <span className="text-sm text-gray-400">
                  {recipe.averageRating > 0
                    ? `${recipe.averageRating.toFixed(1)} (${recipe.ratings?.length || 0} rating${recipe.ratings?.length === 1 ? '' : 's'})`
                    : 'No ratings yet'}
                </span>
              </div>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={15} /> Delete
            </button>
          )}
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="mt-6 overflow-hidden rounded-3xl shadow-card">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="aspect-[21/9] w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="hidden aspect-[21/9] w-full items-center justify-center bg-gradient-to-br from-cream-100 to-cream-200 text-7xl"
          style={!recipe.image ? { display: 'flex' } : {}}
        >
          {category?.emoji || '🍽️'}
        </div>
      </div>

      {/* RATE */}
      <div className="card mt-6 flex flex-col items-center gap-2 p-5 sm:flex-row sm:justify-between">
        <p className="font-semibold text-gray-700">Rate this recipe</p>
        <div className="flex items-center gap-3">
          <StarRating
            value={recipe.averageRating}
            interactive
            size={26}
            onRate={handleRate}
          />
          <span className="text-sm text-gray-400">
            {user ? 'Tap a star' : 'Log in to rate'}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr]">
        {/* INGREDIENTS */}
        <div className="card !p-6">
          <h2 className="font-display text-xl font-bold text-gray-900">Ingredients</h2>
          <ul className="mt-4 space-y-2.5">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-leaf-500" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}
        <div className="card !p-6">
          <h2 className="font-display text-xl font-bold text-gray-900">Instructions</h2>
          <ol className="mt-4 space-y-5">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tomato-500/10 font-bold text-tomato-600">
                  {i + 1}
                </span>
                <p className="pt-1 text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;