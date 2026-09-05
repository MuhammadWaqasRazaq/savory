import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, ListFilter } from 'lucide-react';
import RecipeCard from '../components/RecipeCard.jsx';
import { RecipeGridSkeleton } from '../components/Skeletons.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { recipeService } from '../services/api.js';
import { CATEGORY_NAMES, TIME_FILTERS } from '../constants.js';

const RecipeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const category = searchParams.get('category') || '';
  const time = searchParams.get('time') || '';
  const search = searchParams.get('search') || '';

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category) params.category = category;
      if (time) params.time = time;
      if (search) params.search = search;
      const data = await recipeService.getRecipes(params);
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, time, search]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const updateParams = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const clearAll = () => setSearchParams({});

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Browse <span className="text-tomato-500">recipes</span>
          </h1>
          <p className="mt-1.5 text-gray-500">
            {loading
              ? 'Finding delicious recipes…'
              : `${recipes.length} recipe${recipes.length === 1 ? '' : 's'} found`}
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="card mt-6 !p-4 sm:!p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => updateParams('search', e.target.value)}
              placeholder="Search by title or ingredient…"
              className="input !pl-10"
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <ListFilter size={16} className="hidden text-tomato-400 sm:block" />
            <select
              value={category}
              onChange={(e) => updateParams('category', e.target.value)}
              className="input !w-auto min-w-40 cursor-pointer"
            >
              <option value="">All Categories</option>
              {CATEGORY_NAMES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <SlidersHorizontal size={16} className="hidden text-tomato-400 sm:block" />
            <select
              value={time}
              onChange={(e) => updateParams('time', e.target.value)}
              className="input !w-auto min-w-44 cursor-pointer"
            >
              {TIME_FILTERS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>

          {(category || time || search) && (
            <button
              onClick={clearAll}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={15} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className="mt-8">
        {loading ? (
          <RecipeGridSkeleton count={8} />
        ) : error ? (
          <EmptyState title="Something went wrong" subtitle={error} />
        ) : recipes.length === 0 ? (
          <EmptyState
            title="No recipes found"
            subtitle="Try a different category, time range or search term."
            action={
              <button onClick={clearAll} className="btn-secondary mt-5 !py-2 text-sm">
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;