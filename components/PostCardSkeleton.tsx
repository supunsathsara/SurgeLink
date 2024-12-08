const PostCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card animate-pulse">
      <div className="aspect-square bg-muted">
        <div className="h-full w-full bg-gray-300"></div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;