import React from "react";

type SkeletonBaseProps = {
  className?: string;
};

const SkeletonText: React.FC<SkeletonBaseProps & { invisible?: boolean }> = ({
  className = "",
  invisible = false,
}) => {
  return (
    <span
      className={`font-size-0 dark:white-300 inline-block animate-pulse rounded-md bg-gray-300 empty:before:inline-block empty:before:content-[''] ${className} ${
        invisible ? "invisible" : ""
      }`}
    />
  );
};

export { SkeletonText };
