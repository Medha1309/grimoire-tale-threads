/**
 * Quick Test Utility for Archive System
 * Run this in browser console to test archive functionality
 */

import { populateSampleArchive, clearArchiveData } from './sampleArchiveData';

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).testArchive = {
    populate: populateSampleArchive,
    clear: clearArchiveData,
    
    // Quick test function
    test: () => {
      console.log('🧪 Testing Archive System...');
      
      // Clear existing data
      clearArchiveData();
      console.log('✓ Cleared existing archive data');
      
      // Add sample data
      populateSampleArchive();
      console.log('✓ Added sample archive data');
      
      // Check what was added
      const diaryArchive = localStorage.getItem('grimr_archive_diary');
      const readingArchive = localStorage.getItem('grimr_archive_reading');
      const scrapbookArchive = localStorage.getItem('grimr_archive_scrapbook');
      
      console.log('📊 Archive Contents:');
      console.log('  Diary:', diaryArchive ? JSON.parse(diaryArchive).length : 0, 'items');
      console.log('  Reading:', readingArchive ? JSON.parse(readingArchive).length : 0, 'items');
      console.log('  Scrapbook:', scrapbookArchive ? JSON.parse(scrapbookArchive).length : 0, 'items');
      
      console.log('\n✅ Archive system ready to test!');
      console.log('💡 Navigate to Dollhouse and click any archive door');
    },
  };
  
  console.log('🎯 Archive test utilities loaded!');
  console.log('Run: window.testArchive.test()');
  console.log('Or:  window.testArchive.populate()');
  console.log('Or:  window.testArchive.clear()');
}
