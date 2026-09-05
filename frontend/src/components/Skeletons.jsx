const SkeletonCard = () => (
  <div className="card overflow-hidden">
    <div className="skeleton aspect-[4/3]" />
    <div className="space-y-3 p-5">
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-2/3" />
      <div className="flex justify-between pt-2">
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-4 w-20" />
      </div>
    </div>
  </div>
);

export const RecipeGridSkeleton = ({ count = 8 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);