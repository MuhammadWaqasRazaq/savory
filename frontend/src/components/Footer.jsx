import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-tomato-400 to-tomato-600 text-white">
              <UtensilsCrossed size={18} />
            </span>
            <span className="font-display text-lg font-bold text-gray-900">
              Savory<span className="text-tomato-500">.</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="transition hover:text-tomato-600">Home</Link>
            <Link to="/recipes" className="transition hover:text-tomato-600">Browse Recipes</Link>
            <Link to="/submit" className="transition hover:text-tomato-600">Submit Recipe</Link>
            <Link to="/profile" className="transition hover:text-tomato-600">Profile</Link>
          </nav>

          <p className="text-sm text-gray-400">© {year} Savory. Cooked with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;