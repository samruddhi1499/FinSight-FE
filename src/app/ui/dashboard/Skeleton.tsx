const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-50 p-4 shadow-sm flex-1 ${shimmer}`}
      style={{ minWidth: 200 }}
    >
      <div className="flex items-center space-x-2 p-2.5">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="h-5 w-20 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="rounded-xl bg-white px-4 py-8 text-center">
        <div className="mx-auto h-7 w-32 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="flex space-x-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}


export function RevenueChartSkeleton() {
  return (
   <div className={`${shimmer} rounded-xl text-stone-600 bg-gray-50 p-4 shadow-sm w-full overflow-hidden`}>
  <div className="bg-white p-6 rounded-xl h-full shadow overflow-auto">
    <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
    <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-gray-100 p-4 md:gap-4" />
    <div className="flex items-center pb-2 pt-6">
      <div className="h-5 w-5 rounded-full bg-gray-200" />
      <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
    </div>
  </div>
</div>

  );
}