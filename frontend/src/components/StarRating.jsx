import { Star } from 'lucide-react';
import { MAX_RATING } from '../constants.js';

export const StarRating = ({ value = 0, interactive = false, size = 16, onRate, className = '' }) => (
  <div className={`flex items-center gap-0.5 ${className}`}>
    {Array.from({ length: MAX_RATING }).map((_, i) => {
      const filled = i < Math.round(value);
      const icon = (
        <Star
          key={i}
          size={size}
          className={
            filled
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-100 text-gray-200'
          }
        />
      );

      if (!interactive) {
        return icon;
      }

      return (
        <button
          key={i}
          type="button"
          onClick={() => onRate && onRate(i + 1)}
          className="transition-transform hover:scale-125"
          aria-label={`Rate ${i + 1} stars`}
        >
          <Star
            size={size}
            className={
              onRate && i < value
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-100 text-gray-200'
            }
          />
        </button>
      );
    })}
  </div>
);