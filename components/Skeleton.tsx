"use client";

export default function Skeleton() {
  return (
    <div className="w-full h-full flex flex-col p-4 md:p-7 gap-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-44 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Day headers skeleton */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-6 bg-gray-100 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Calendar grid skeleton */}
      <div className="grid grid-cols-7 gap-1 flex-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="h-10 md:h-12 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>

      {/* Range info skeleton */}
      <div className="h-8 bg-gray-100 rounded animate-pulse" />

      {/* Notes section skeleton */}
      <div className="space-y-3">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3" />
        <div className="h-10 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  );
}
