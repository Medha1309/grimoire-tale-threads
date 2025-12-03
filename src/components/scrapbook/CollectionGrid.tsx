import React from 'react';
import { motion } from 'framer-motion';
import { ScrapbookCollection } from '../../types/scrapbook';
import { CollectionCard } from './CollectionCard';

interface CollectionGridProps {
  collections: ScrapbookCollection[];
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection, index) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <CollectionCard collection={collection} />
        </motion.div>
      ))}
    </div>
  );
};
