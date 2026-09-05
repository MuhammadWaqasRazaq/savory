export const CATEGORIES = {
  Breakfast: {
    label: 'Breakfast',
    emoji: '🍳',
    color: 'bg-amber-100 text-amber-800',
    gradient: 'from-amber-50 to-orange-50',
  },
  Lunch: {
    label: 'Lunch',
    emoji: '🥪',
    color: 'bg-lime-100 text-lime-800',
    gradient: 'from-lime-50 to-green-50',
  },
  Dinner: {
    label: 'Dinner',
    emoji: '🍲',
    color: 'bg-indigo-100 text-indigo-800',
    gradient: 'from-indigo-50 to-blue-50',
  },
  Dessert: {
    label: 'Dessert',
    emoji: '🍰',
    color: 'bg-pink-100 text-pink-800',
    gradient: 'from-pink-50 to-rose-50',
  },
  Vegan: {
    label: 'Vegan',
    emoji: '🥑',
    color: 'bg-green-100 text-green-800',
    gradient: 'from-green-50 to-emerald-50',
  },
  Vegetarian: {
    label: 'Vegetarian',
    emoji: '🥦',
    color: 'bg-teal-100 text-teal-800',
    gradient: 'from-teal-50 to-cyan-50',
  },
  Snack: {
    label: 'Snack',
    emoji: '🍿',
    color: 'bg-orange-100 text-orange-800',
    gradient: 'from-orange-50 to-amber-50',
  },
  Drink: {
    label: 'Drink',
    emoji: '🍹',
    color: 'bg-cyan-100 text-cyan-800',
    gradient: 'from-cyan-50 to-sky-50',
  },
};

export const CATEGORY_NAMES = Object.keys(CATEGORIES);

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const TIME_FILTERS = [
  { value: '', label: 'Any time' },
  { value: 'lt30', label: 'Under 30 minutes' },
  { value: '30to60', label: '30 – 60 minutes' },
  { value: 'gt60', label: 'Over 1 hour' },
];

export const DIFFICULTY_STYLES = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
};

export const IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352';

export const MAX_RATING = 5;