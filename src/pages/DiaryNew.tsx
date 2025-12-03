/**
 * New Diary Page - Integration Example
 * This is a simple wrapper that can be used in your router
 */

import React from 'react';
import { DiaryPage } from '../modules/diary';

/**
 * Diary page component for router integration
 * 
 * Usage in router:
 * {
 *   path: '/diary',
 *   element: <ProtectedRoute><DiaryNew /></ProtectedRoute>
 * }
 */
export const DiaryNew: React.FC = () => {
  return <DiaryPage />;
};

export default DiaryNew;
