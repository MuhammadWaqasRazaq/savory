import { AlertCircle } from 'lucide-react';

export const EmptyState = ({ title = 'No recipes found', subtitle = 'Try adjusting your filters or search.', action }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-100">
      <AlertCircle size={28} className="text-gray-400" />
    </div>
    <h3 className="font-display text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-1.5 max-w-sm text-sm text-gray-500">{subtitle}</p>
    {action}
  </div>
);