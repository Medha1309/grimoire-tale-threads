/**
 * Seed Chain Sessions Data
 * Run this to populate demo data for Chain Lab
 */

import { seedChainSessions } from '../hooks/useChainSession';
import { SAMPLE_CHAIN_SESSIONS } from '../data/sampleChainSessions';

export async function seedChainData() {
  try {
    console.log('Seeding chain sessions...');
    await seedChainSessions(SAMPLE_CHAIN_SESSIONS);
    console.log('✅ Chain sessions seeded successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error seeding chain sessions:', error);
    return false;
  }
}
