import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle, ChefHat, Users, Star, Clock, Search } from 'lucide-react';
import RecipeCard from '../components/RecipeCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { RecipeGridSkeleton } from '../components/Skeletons.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { recipeService } from '../services/api.js';
import { CATEGORY_NAMES, CATEGORIES, IMAGE_FALLBACK } from '../constants.js';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const recipes = await recipeService.getRecipes();
        const sorted = [...recipes].sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        setFeatured(sorted.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tomato-600 via-tomato-500 to-orange-400">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, white 1.5px, transparent 1.5px), radial-gradient(circle at 80% 60%, white 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <ChefHat size={16} /> Join 2,000+ home cooks
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Share the flavors
                <span className="block text-orange-100">you love to cook</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-orange-50/90">
                Discover mouth-watering recipes from a community of passionate cooks,
                or share your own culinary masterpieces with the world.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/recipes" className="btn-primary !bg-white !text-tomato-600 hover:!bg-orange-50">
                  Browse Recipes <ArrowRight size={18} />
                </Link>
                <Link to="/submit" className="btn-secondary !bg-white/10 !text-white !ring-white/40 hover:!bg-white/20">
                  <PlusCircle size={18} /> Submit a Recipe
                </Link>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {[
                  { icon: Users, value: '2K+', label: 'Home cooks' },
                  { icon: Star, value: '4.8', label: 'Avg rating' },
                  { icon: Clock, value: '1200+', label: 'Recipes' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur">
                    <Icon size={18} className="mx-auto text-orange-100" />
                    <p className="mt-1.5 font-display text-xl font-bold text-white">{value}</p>
                    <p className="text-xs text-orange-100/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative mx-auto max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                  alt="Delicious food spread"
                  className="aspect-[4/5] w-full rotate-2 rounded-3xl object-cover shadow-2xl ring-1 ring-white/30"
                />
                <img
                  src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327"
                  alt="Plated gourmet dish"
                  className="absolute -bottom-8 -left-12 w-44 rotate-[-6deg] rounded-2xl object-cover shadow-2xl ring-1 ring-white/30"
                />
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                  alt="Fresh salad bowl"
                  className="absolute -top-8 -right-10 w-36 rotate-[6deg] rounded-2xl object-cover shadow-2xl ring-1 ring-white/30"
                />
              </div>
            </div>
          </div>
        </div>
        <svg className="block w-full text-cream-50" viewBox="0 0 1440 60" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,40 C1200,60 720,60 0,20 Z" />
        </svg>
      </section>

      {/* SEARCH STRIP */}
      <section className="mx-auto -mt-1 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="card -translate-y-16 !p-4 shadow-2xl sm:!p-6">
          <div className="mx-auto max-w-2xl">
            <SearchBar
              onSearch={(term) => {
                const q = term ? `?search=${encodeURIComponent(term)}` : '';
                window.location.href = `/recipes${q}`;
              }}
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Explore <span className="text-tomato-500">categories</span>
            </h2>
            <p className="mt-1.5 text-gray-500">Find exactly what you're craving</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORY_NAMES.map((name, i) => {
            const meta = CATEGORIES[name];
            return (
              <Link
                key={name}
                to={`/recipes?category=${encodeURIComponent(name)}`}
                className="card group flex items-center gap-3 p-4 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${meta.gradient} transition-transform duration-300 group-hover:scale-110`}>
                  {meta.emoji}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-tomato-600">{name}</h3>
                  <p className="text-xs text-gray-400">Many delicious picks</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED RECIPES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Chef's <span className="text-tomato-500">picks</span>
            </h2>
            <p className="mt-1.5 text-gray-500">Top-rated recipes from our community</p>
          </div>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-tomato-600 transition hover:translate-x-0.5 hover:text-tomato-700"
          >
            View all recipes <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8">
          {loading ? (
            <RecipeGridSkeleton count={4} />
          ) : error ? (
            <EmptyState title="Oops" subtitle={error} />
          ) : featured.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-600 via-leaf-500 to-emerald-400 px-6 py-16 text-center sm:px-16">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 20%, white 2px, transparent 2px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <PlusCircle size={26} />
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              Got a signature dish?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-emerald-50/90">
              Share your recipe with thousands of hungry home cooks and watch your
              creation become a community favorite.
            </p>
            <div className="mt-7">
              <Link to="/submit" className="btn-primary !bg-white !text-leaf-600 hover:!bg-emerald-50">
                <PlusCircle size={18} /> Submit a Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;