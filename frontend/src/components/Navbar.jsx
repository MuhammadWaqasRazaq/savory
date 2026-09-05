import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Utensils, Search, Menu, X, LogOut, User, PlusCircle, Home, LayoutGrid } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    navigate(`/recipes?${params.toString()}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = (path) =>
    `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? 'bg-tomato-500/10 text-tomato-600'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const NavLinks = () => (
    <>
      <Link to="/" className={navLinkClass('/')}>
        <Home size={16} /> Home
      </Link>
      <Link to="/recipes" className={navLinkClass('/recipes')}>
        <LayoutGrid size={16} /> Browse Recipes
      </Link>
      {user && (
        <Link to="/submit" className={navLinkClass('/submit')}>
          <PlusCircle size={16} /> Submit
        </Link>
      )}
      {user && (
        <Link
          to="/profile"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-tomato-400 to-tomato-600 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
          title={user.name}
        >
          {user.name.charAt(0).toUpperCase()}
        </Link>
      )}
    </>
  );

  const AuthButtons = () =>
    user ? (
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={16} /> Logout
      </button>
    ) : (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Login
        </Link>
        <Link to="/register" className="btn-primary !py-2 text-sm">
          Sign Up
        </Link>
      </div>
    );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-tomato-400 to-tomato-600 text-white shadow-card">
            <Utensils size={20} />
          </span>
          <span className="font-display text-xl font-bold text-gray-900">
            Savory<span className="text-tomato-500">.</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="relative mx-2 hidden flex-1 md:block lg:max-w-sm">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, ingredients…"
            className="w-full rounded-full border border-gray-200 bg-cream-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-tomato-400 focus:bg-white focus:ring-2 focus:ring-tomato-400/20"
          />
        </form>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <AuthButtons />
        </div>

        <button
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes…"
              className="w-full rounded-full border border-gray-200 bg-cream-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-tomato-400"
            />
          </form>
          <div className="flex flex-col gap-1">
            <NavLinks />
            <div className="mt-3 border-t border-gray-100 pt-3">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;