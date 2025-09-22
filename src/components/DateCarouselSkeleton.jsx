// src/components/DateCarouselSkeleton.jsx
import Skeleton from './Skeleton';

function DateCarouselSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-4 sm:space-x-6 my-8 animate-pulse">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="text-center w-48">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
      </div>
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
}

export default DateCarouselSkeleton;