import React from 'react';
import { motion } from 'framer-motion';
import { ScrapbookItem } from '../../types/scrapbook';
import { ItemCard } from './ItemCard';

interface ItemListViewProps {
  items: ScrapbookItem[];
  collectionId: string;
}

export const ItemListView: React.FC<ItemListViewProps> = ({ items, collectionId }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ItemCard item={item} collectionId={collectionId} listView />
        </motion.div>
      ))}
    </div>
  );
};
