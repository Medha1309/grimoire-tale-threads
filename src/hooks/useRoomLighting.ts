import { useState, useEffect } from 'react';

interface UseRoomLightingReturn {
  litRoom: number;
  hoveredRoom: number;
  possessedRoom: number;
  setLitRoom: (room: number) => void;
  setHoveredRoom: (room: number) => void;
  setPossessedRoom: (room: number) => void;
  handleRoomHover: (roomIndex: number) => void;
  handleRoomLeave: () => void;
}

export const useRoomLighting = (): UseRoomLightingReturn => {
  const [litRoom, setLitRoom] = useState(-1);
  const [hoveredRoom, setHoveredRoom] = useState(-1);
  const [possessedRoom, setPossessedRoom] = useState(-1);

  // Room lighting effect - light up on hover
  useEffect(() => {
    if (hoveredRoom === -1) return;
    
    const timer = setTimeout(() => {
      setLitRoom(hoveredRoom);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [hoveredRoom]);

  // Smooth sequential room lighting - ambient effect
  useEffect(() => {
    let currentRoom = 0;
    
    const lightNextRoom = () => {
      setLitRoom(currentRoom);
      
      setTimeout(() => {
        setLitRoom(-1);
        
        setTimeout(() => {
          currentRoom = (currentRoom + 1) % 5;
        }, 800);
      }, 3000);
    };

    const intervalId = setInterval(lightNextRoom, 4500);
    setTimeout(lightNextRoom, 2000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Subtle pulse effect - random room possession
  useEffect(() => {
    const pulseRoom = () => {
      if (hoveredRoom === -1) {
        const randomRoom = Math.floor(Math.random() * 5);
        setPossessedRoom(randomRoom);
        
        setTimeout(() => {
          setPossessedRoom(-1);
        }, 600);
      }
    };

    const intervalId = setInterval(pulseRoom, 12000);
    setTimeout(pulseRoom, 8000);
    
    return () => clearInterval(intervalId);
  }, [hoveredRoom]);

  // Room hover handlers
  const handleRoomHover = (roomIndex: number) => setHoveredRoom(roomIndex);
  const handleRoomLeave = () => setHoveredRoom(-1);

  return {
    litRoom,
    hoveredRoom,
    possessedRoom,
    setLitRoom,
    setHoveredRoom,
    setPossessedRoom,
    handleRoomHover,
    handleRoomLeave,
  };
};
