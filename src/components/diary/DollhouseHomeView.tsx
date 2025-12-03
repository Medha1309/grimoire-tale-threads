import React from 'react';
import { motion } from 'framer-motion';
import { DollhouseRoom } from './DollhouseRoom';
import { DollhouseTerminal } from '../terminal/DollhouseTerminal';
import { DollhouseBackButton } from './shared/DollhouseButton';

interface DollhouseHomeViewProps {
  litRoom: number;
  hoveredRoom: number;
  possessedRoom: number;
  randomLitRooms?: Set<number>;
  onRoomHover: (roomIndex: number) => void;
  onRoomLeave: () => void;
  onNavigateToRoom: (view: 'diary' | 'scrapbook' | 'bookmarks' | 'archive' | 'art') => void;
  onBack?: () => void;
}

const RoomWrapper: React.FC<{
  roomIndex: number;
  hoveredRoom: number;
  litRoom: number;
  randomLitRooms?: Set<number>;
  onRoomHover: (index: number) => void;
  onRoomLeave: () => void;
  children: React.ReactNode;
  delay: number;
  glowColor?: string;
}> = ({ roomIndex, hoveredRoom, litRoom, randomLitRooms, onRoomHover, onRoomLeave, children, delay, glowColor = 'rgba(255,182,217,0.3)' }) => {
  const isRandomlyLit = randomLitRooms?.has(roomIndex) || false;
  
  // Debug logging
  React.useEffect(() => {
    if (isRandomlyLit) {
      console.log(`🔥 Room ${roomIndex} is NOW LIT!`, { randomLitRooms: Array.from(randomLitRooms || []) });
    }
  }, [isRandomlyLit, roomIndex, randomLitRooms]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => onRoomHover(roomIndex)}
      onMouseLeave={onRoomLeave}
      className="relative group"
    >
      {/* Hover/manual glow */}
      <motion.div
        className="absolute -inset-4 pointer-events-none rounded-lg"
        animate={{
          opacity: hoveredRoom === roomIndex ? 0.5 : litRoom === roomIndex ? 0.25 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Random ambient lighting - ULTRA VISIBLE */}
      {isRandomlyLit && (
        <>
          {/* Massive outer glow */}
          <motion.div
            className="absolute -inset-12 pointer-events-none rounded-lg"
            animate={{
              opacity: [0, 0.8, 1, 0.8, 0],
            }}
            transition={{ 
              duration: 3,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(ellipse at center, ${glowColor.replace('0.3', '1')} 0%, ${glowColor.replace('0.3', '0.6')} 50%, transparent 70%)`,
              filter: 'blur(50px)',
            }}
          />
          
          {/* Bright inner core */}
          <motion.div
            className="absolute -inset-6 pointer-events-none rounded-lg"
            animate={{
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ 
              duration: 3,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(ellipse at center, ${glowColor.replace('0.3', '0.9')} 0%, ${glowColor.replace('0.3', '0.5')} 60%, transparent 80%)`,
              filter: 'blur(30px)',
            }}
          />
        </>
      )}
      
      {children}
    </motion.div>
  );
};

export const DollhouseHomeView: React.FC<DollhouseHomeViewProps> = ({
  litRoom,
  hoveredRoom,
  randomLitRooms,
  onRoomHover,
  onRoomLeave,
  onNavigateToRoom,
  onBack,
}) => {
  const handleTerminalNavigate = (view: string) => {
    // Map terminal commands to view types
    const viewMap: Record<string, 'diary' | 'scrapbook' | 'bookmarks' | 'archive' | 'art'> = {
      diary: 'diary',
      scrapbook: 'scrapbook',
      bookmarks: 'bookmarks',
      archive: 'archive',
      art: 'art',
    };
    
    const mappedView = viewMap[view];
    if (mappedView) {
      onNavigateToRoom(mappedView);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Back Button */}
      {onBack && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <DollhouseBackButton onClick={onBack} label="Exit Dollhouse" />
        </motion.div>
      )}

      {/* Main featured room - Diary (larger, centered) */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-sm">
          <RoomWrapper
            roomIndex={0}
            hoveredRoom={hoveredRoom}
            litRoom={litRoom}
            randomLitRooms={randomLitRooms}
            onRoomHover={onRoomHover}
            onRoomLeave={onRoomLeave}
            delay={0.2}
          >
            <DollhouseRoom
              title="Diary"
              onClick={() => onNavigateToRoom('diary')}
              delay={0}
              isLit={litRoom === 0}
              roomIndex={0}
            />
          </RoomWrapper>
        </div>
      </div>

      {/* Secondary rooms - 2x2 grid with better spacing */}
      <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mb-12">
        {/* Scrapbook */}
        <RoomWrapper
          roomIndex={1}
          hoveredRoom={hoveredRoom}
          litRoom={litRoom}
          randomLitRooms={randomLitRooms}
          onRoomHover={onRoomHover}
          onRoomLeave={onRoomLeave}
          delay={0.3}
        >
          <DollhouseRoom
            title="Scrapbook"
            onClick={() => onNavigateToRoom('scrapbook')}
            delay={0.05}
            isLit={litRoom === 1}
            roomIndex={1}
          />
        </RoomWrapper>

        {/* Art Studio */}
        <RoomWrapper
          roomIndex={2}
          hoveredRoom={hoveredRoom}
          litRoom={litRoom}
          randomLitRooms={randomLitRooms}
          onRoomHover={onRoomHover}
          onRoomLeave={onRoomLeave}
          delay={0.35}
        >
          <DollhouseRoom
            title="Art Studio"
            onClick={() => onNavigateToRoom('art')}
            delay={0.075}
            isLit={litRoom === 2}
            roomIndex={2}
          />
        </RoomWrapper>

        {/* Archive (Reading History) */}
        <RoomWrapper
          roomIndex={3}
          hoveredRoom={hoveredRoom}
          litRoom={litRoom}
          randomLitRooms={randomLitRooms}
          onRoomHover={onRoomHover}
          onRoomLeave={onRoomLeave}
          delay={0.4}
          glowColor="rgba(255, 105, 180, 0.3)"
        >
          <DollhouseRoom
            title="Archive"
            onClick={() => onNavigateToRoom('archive')}
            delay={0.1}
            isLit={litRoom === 3}
            roomIndex={3}
          />
        </RoomWrapper>

        {/* Saved Books */}
        <RoomWrapper
          roomIndex={4}
          hoveredRoom={hoveredRoom}
          litRoom={litRoom}
          randomLitRooms={randomLitRooms}
          onRoomHover={onRoomHover}
          onRoomLeave={onRoomLeave}
          delay={0.45}
        >
          <DollhouseRoom
            title="Saved Books"
            onClick={() => onNavigateToRoom('bookmarks')}
            delay={0.125}
            isLit={litRoom === 4}
            roomIndex={4}
          />
        </RoomWrapper>
      </div>

      {/* Terminal at the bottom - more integrated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <DollhouseTerminal onNavigate={handleTerminalNavigate} />
      </motion.div>
    </div>
  );
};
