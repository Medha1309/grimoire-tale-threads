import React from 'react';
import Masonry from 'react-masonry-css';
import { ScrapbookItem } from '../../types/scrapbook';
import { ItemCard } from './ItemCard';

interface ItemMasonryGridProps {
  items: ScrapbookItem[];
  collectionId: string;
}

export const ItemMasonryGrid: React.FC<ItemMasonryGridProps> = ({ items, collectionId }) => {
  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {items.map((item) => (
        <div key={item.id} className="mb-6">
          <ItemCard item={item} collectionId={collectionId} />
        </div>
      ))}
    </Masonry>
  );
};
