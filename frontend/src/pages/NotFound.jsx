import { Link } from 'react-router-dom';
import { Compass, Utensils } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
    <p className="font-display text-7xl font-bold text-tomato-500">404</p>
    <h1 className="mt-4 font-display text-2xl font-bold text-gray-900">
      This recipe wandered off the menu
    </h1>
    <p className="mt-2 max-w-md text-gray-500">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <div className="mt-6 flex gap-3">
      <Link to="/" className="btn-secondary">
        <Utensils size={18} /> Go home
      </Link>
      <Link to="/recipes" className="btn-primary">
        <Compass size={18} /> Browse recipes
      </Link>
    </div>
  </div>
);

export default NotFound;