import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MOCK_BOOK_DATA } from '../data/mockBookData';

/**
 * Verifies that mock data was populated correctly in Firebase
 * Returns a report of what was found
 */
export const verifyMockData = async () => {
  console.log('Starting verification of mock data...');
  
  const report = {
    totalStories: MOCK_BOOK_DATA.length,
    statsFound: 0,
    commentsFound: 0,
    storiesWithData: [] as string[],
    storiesMissingData: [] as string[],
    errors: [] as string[],
  };

  try {
    for (const bookData of MOCK_BOOK_DATA) {
      const storyId = bookData.storyId;
      let hasData = false;

      // Check if stats exist
      try {
        const statsQuery = query(
          collection(db, 'storyStats'),
          where('__name__', '==', storyId)
        );
        const statsSnapshot = await getDocs(statsQuery);
        if (!statsSnapshot.empty) {
          report.statsFound++;
          hasData = true;
        }
      } catch (error: any) {
        report.errors.push(`Error checking stats for ${storyId}: ${error.message}`);
      }

      // Check if comments exist
      try {
        const commentsQuery = query(
          collection(db, 'comments'),
          where('storyId', '==', storyId)
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentCount = commentsSnapshot.size;
        if (commentCount > 0) {
          report.commentsFound += commentCount;
          hasData = true;
        }
      } catch (error: any) {
        report.errors.push(`Error checking comments for ${storyId}: ${error.message}`);
      }

      if (hasData) {
        report.storiesWithData.push(storyId);
      } else {
        report.storiesMissingData.push(storyId);
      }
    }

    console.log('Verification complete!');
    console.log('Report:', report);
    
    return report;
  } catch (error: any) {
    console.error('Verification failed:', error);
    return {
      ...report,
      errors: [...report.errors, `Fatal error: ${error.message}`],
    };
  }
};

/**
 * Formats the verification report for display
 */
export const formatVerificationReport = (report: Awaited<ReturnType<typeof verifyMockData>>) => {
  const lines = [
    '=== Mock Data Verification Report ===',
    '',
    `Total Stories: ${report.totalStories}`,
    `Stories with Data: ${report.storiesWithData.length}`,
    `Stories Missing Data: ${report.storiesMissingData.length}`,
    `Stats Documents Found: ${report.statsFound}`,
    `Comments Found: ${report.commentsFound}`,
    '',
  ];

  if (report.storiesWithData.length > 0) {
    lines.push('✅ Stories with data:');
    report.storiesWithData.forEach(id => lines.push(`  - ${id}`));
    lines.push('');
  }

  if (report.storiesMissingData.length > 0) {
    lines.push('❌ Stories missing data:');
    report.storiesMissingData.forEach(id => lines.push(`  - ${id}`));
    lines.push('');
  }

  if (report.errors.length > 0) {
    lines.push('⚠️ Errors encountered:');
    report.errors.forEach(err => lines.push(`  - ${err}`));
    lines.push('');
  }

  const successRate = Math.round((report.storiesWithData.length / report.totalStories) * 100);
  lines.push(`Success Rate: ${successRate}%`);
  
  return lines.join('\n');
};
