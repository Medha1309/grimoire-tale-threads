import React from 'react';
import { CollaborativeProject } from '../../types/collaborativeStory';
import { formatDistanceToNow } from 'date-fns';
import { getStatusConfig } from '../../config/taleThreads';

// Simple icon components
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

interface ProjectCardProps {
  project: CollaborativeProject;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const statusConfig = getStatusConfig(project.status);
  
  const getStatusColor = (color: string) => {
    const colorMap: Record<string, string> = {
      lime: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    };
    return colorMap[color] || colorMap.amber;
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-slate-950/50 border border-slate-800 rounded-lg p-5 cursor-pointer
               hover:bg-slate-900/50 hover:border-slate-700
               transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Left: Icon/Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-purple-400" />
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-200 group-hover:text-purple-400 transition-colors truncate">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {project.ownerName}
              </p>
            </div>

            {/* Status Badge */}
            <span
              className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(
                statusConfig?.color || 'amber'
              )}`}
            >
              {statusConfig?.label || project.status}
            </span>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {project.genre && (
              <span className="px-2 py-0.5 bg-slate-800/50 rounded-full">
                {project.genre}
              </span>
            )}
            
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>
                {project.coAuthors.length}/{project.maxCoAuthors}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimestamp(project.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Right: Arrow */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
