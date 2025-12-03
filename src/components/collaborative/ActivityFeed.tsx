import React from 'react';
import { Activity } from '../../types/collaborativeStory';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
}

const getActivityIcon = (type: Activity['type']) => {
  const iconClass = "w-5 h-5";
  
  switch (type) {
    case 'proposal_created':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
    case 'proposal_submitted':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'vote_cast':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    case 'proposal_approved':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'proposal_rejected':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'proposal_merged':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    case 'coauthor_joined':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    case 'coauthor_left':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
        </svg>
      );
    case 'story_finalized':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'proposal_approved':
    case 'proposal_merged':
    case 'coauthor_joined':
      return 'text-lime-400 bg-lime-500/10 border-lime-500/20';
    case 'proposal_rejected':
    case 'coauthor_left':
      return 'text-red-400 bg-red-500/10 border-red-500/20';
    case 'vote_cast':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'story_finalized':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    default:
      return 'text-stone-400 bg-stone-500/10 border-stone-500/20';
  }
};

const getActivityMessage = (activity: Activity) => {
  const { type, userName, metadata } = activity;
  
  switch (type) {
    case 'proposal_created':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}created a proposal
          {metadata.proposalTitle && (
            <span className="text-stone-400"> "{metadata.proposalTitle}"</span>
          )}
        </>
      );
    case 'proposal_submitted':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}submitted a proposal for voting
        </>
      );
    case 'vote_cast':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}voted{' '}
          <span className={metadata.voteType === 'approve' ? 'text-lime-400' : 'text-red-400'}>
            {metadata.voteType}
          </span>
          {' '}on a proposal
        </>
      );
    case 'proposal_approved':
      return (
        <>
          Proposal{' '}
          <span className="text-lime-400">approved</span>
          {' '}by community vote
        </>
      );
    case 'proposal_rejected':
      return (
        <>
          Proposal{' '}
          <span className="text-red-400">rejected</span>
          {' '}by community vote
        </>
      );
    case 'proposal_merged':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}merged a proposal into the story
        </>
      );
    case 'coauthor_joined':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}joined as a co-author
        </>
      );
    case 'coauthor_left':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}left the project
        </>
      );
    case 'story_finalized':
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}finalized the story 🎉
        </>
      );
    default:
      return (
        <>
          <span className="font-semibold text-stone-200">{userName}</span>
          {' '}performed an action
        </>
      );
  }
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, maxItems = 10 }) => {
  const displayedActivities = activities.slice(0, maxItems);

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-stone-500">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>No activity yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayedActivities.map((activity) => {
        const timestamp = activity.createdAt instanceof Timestamp 
          ? activity.createdAt.toDate() 
          : activity.createdAt;
        
        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 bg-stone-800/30 rounded-lg border border-stone-700/50 hover:border-stone-600/50 transition-colors"
          >
            <div className={`flex-shrink-0 p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm text-stone-300">
                {getActivityMessage(activity)}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {formatDistanceToNow(timestamp, { addSuffix: true })}
              </div>
            </div>
          </div>
        );
      })}
      
      {activities.length > maxItems && (
        <div className="text-center pt-2">
          <button className="text-sm text-stone-400 hover:text-stone-300 transition-colors">
            View all {activities.length} activities →
          </button>
        </div>
      )}
    </div>
  );
};
