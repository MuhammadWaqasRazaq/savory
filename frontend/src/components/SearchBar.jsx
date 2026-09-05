import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ initialValue = '', onSearch, className = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search recipes, ingredients…"
        className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-32 text-sm shadow-soft outline-none transition focus:border-tomato-400 focus:ring-2 focus:ring-tomato-400/20"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-tomato-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-tomato-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;