import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Mail, BookOpen } from 'lucide-react';
import RecipeCard from '../components/RecipeCard.jsx';
import { RecipeGridSkeleton } from '../components/Skeletons.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { recipeService } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await recipeService.getMyRecipes();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-tomato-500 via-orange-400 to-amber-400" />
        <div className="px-6 pb-6 sm:px-8">
          <div className="-mt-10 flex items-center gap-4">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-tomato-400 to-tomato-600 font-display text-3xl font-bold text-white shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
            <div className="pt-8">
              <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                {user?.name}
              </h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <Mail size={14} /> {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900">
            My <span className="text-tomato-500">recipes</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">{recipes.length} submitted</p>
        </div>
        <Link to="/submit" className="btn-primary !py-2.5 text-sm">
          <PlusCircle size={16} /> New Recipe
        </Link>
      </div>

      {loading ? (
        <RecipeGridSkeleton count={4} />
      ) : error ? (
        <EmptyState title="Oops" subtitle={error} />
      ) : recipes.length === 0 ? (
        <EmptyState
          title="No recipes yet"
          subtitle="You haven't shared any recipes. Let's fix that!"
          action={
            <Link to="/submit" className="btn-primary mt-5 !py-2.5 text-sm">
              <PlusCircle size={16} /> Submit your first recipe
            </Link>
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
  );
};

export default Profile;