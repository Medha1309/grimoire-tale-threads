import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import { useCollaborativeProjects } from '../../hooks/useCollaborativeProjects';
import { ProjectStatus } from '../../types/collaborativeStory';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';
import { Button } from '../shared/Button';
import { UI_CONFIG } from '../../config/taleThreads';

// Simple icon components
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const CollaborativeStoriesView: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ProjectStatus | undefined>();
  const [genre, setGenre] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const { projects, loading, error } = useCollaborativeProjects({
    status,
    genre,
    searchTerm,
    limit: UI_CONFIG.list.defaultPageSize,
  });

  const handleClearFilters = () => {
    setStatus(undefined);
    setGenre(undefined);
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading projects: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* GitHub-style header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-200 flex items-center gap-3">
            <Users className="w-6 h-6" />
            Story Projects
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Collaborate on stories with version control and proposals
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/stories')}
          className="flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Browse Library
        </Button>
      </div>

      {/* Filters */}
      <ProjectFilters
        status={status}
        genre={genre}
        searchTerm={searchTerm}
        onStatusChange={setStatus}
        onGenreChange={setGenre}
        onSearchChange={setSearchTerm}
        onClear={handleClearFilters}
      />

      {/* Projects List - Vertical GitHub-style */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 space-y-4 border border-slate-800 rounded-lg bg-slate-950/50">
          <BookOpen className="w-16 h-16 mx-auto text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-400">No projects found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {searchTerm || status || genre
              ? 'Try adjusting your filters to see more projects'
              : 'Be the first to create a collaborative story! Go to the Library and enable collaboration on one of your stories.'}
          </p>
          {(searchTerm || status || genre) && (
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="text-sm text-slate-400">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/chains/projects/${project.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
