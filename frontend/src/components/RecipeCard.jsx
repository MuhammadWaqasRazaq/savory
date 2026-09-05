import { Link } from 'react-router-dom';
import { Clock, Star, Flame } from 'lucide-react';
import { CATEGORIES, DIFFICULTY_STYLES } from '../constants.js';
import { formatTime } from '../utils/format.js';

const RecipeCard = ({ recipe }) => {
  const category = CATEGORIES[recipe.category];
  const difficultyStyle = DIFFICULTY_STYLES[recipe.difficulty] || 'bg-gray-100 text-gray-700';

  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="card group flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-cream-100 to-cream-200 text-5xl"
          style={!recipe.image ? { display: 'flex' } : {}}
        >
          {category?.emoji || '🍽️'}
        </div>
        {category && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${category.color}`}
          >
            {category.emoji} {category.label}
          </span>
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyStyle}`}
        >
          {recipe.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-gray-900 transition-colors group-hover:text-tomato-600">
          {recipe.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-gray-500">
          {recipe.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-600">
            <Clock size={15} className="text-tomato-400" />
            {formatTime(recipe.cookingTime)}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700">
            {recipe.averageRating > 0 ? (
              <>
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span>{recipe.averageRating.toFixed(1)}</span>
                <span className="font-normal text-gray-400">
                  ({recipe.ratings?.length || 0})
                </span>
              </>
            ) : (
              <span className="flex items-center gap-1 text-gray-400">
                <Flame size={15} className="text-tomato-400" /> Unrated
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;