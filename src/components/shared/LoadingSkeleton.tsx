import React from "react";
import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "text" | "avatar" | "full";
  count?: number;
  className?: string;
}

const SkeletonPulse: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    className={`bg-zinc-800/50 rounded ${className}`}
    animate={{
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "card",
  count = 1,
  className = "",
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className={`border border-zinc-800 rounded-lg p-6 space-y-4 ${className}`}>
            <SkeletonPulse className="h-48 w-full" />
            <SkeletonPulse className="h-6 w-3/4" />
            <SkeletonPulse className="h-4 w-full" />
            <SkeletonPulse className="h-4 w-5/6" />
          </div>
        );

      case "list":
        return (
          <div className={`border-b border-zinc-800 py-4 space-y-3 ${className}`}>
            <div className="flex items-center gap-3">
              <SkeletonPulse className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonPulse className="h-4 w-1/3" />
                <SkeletonPulse className="h-3 w-1/4" />
              </div>
            </div>
            <SkeletonPulse className="h-4 w-full" />
            <SkeletonPulse className="h-4 w-4/5" />
          </div>
        );

      case "text":
        return (
          <div className={`space-y-2 ${className}`}>
            <SkeletonPulse className="h-4 w-full" />
            <SkeletonPulse className="h-4 w-11/12" />
            <SkeletonPulse className="h-4 w-4/5" />
          </div>
        );

      case "avatar":
        return (
          <div className={`flex items-center gap-3 ${className}`}>
            <SkeletonPulse className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonPulse className="h-4 w-32" />
              <SkeletonPulse className="h-3 w-24" />
            </div>
          </div>
        );

      case "full":
        return (
          <div className={`min-h-screen flex items-center justify-center ${className}`}>
            <div className="text-center space-y-4">
              <motion.div
                className="inline-block h-12 w-12 border-4 border-zinc-700 border-t-red-900 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-zinc-500 text-sm">Loading...</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
};
