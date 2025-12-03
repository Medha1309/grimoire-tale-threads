import { useState, useCallback } from 'react';
import { ArchivedGameSession } from '../types/archive';

const STORAGE_KEY = 'grimr_game_archive';

export const useGameArchive = () => {
  const [gameSessions, setGameSessions] = useState<ArchivedGameSession[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveGameSession = useCallback((
    gameName: 'ouroboros' | 'haunted-pacman',
    result: 'won' | 'lost',
    score: number,
    duration: number,
    crypticMessage?: string
  ) => {
    const newSession: ArchivedGameSession = {
      id: `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'game',
      gameName,
      result,
      score,
      duration,
      crypticMessage,
      archivedAt: new Date(),
      originalCreatedAt: new Date(),
      attempts: 1,
    };

    setGameSessions(prev => {
      const updated = [newSession, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    return newSession;
  }, []);

  const getGameStats = useCallback((gameName?: 'ouroboros' | 'haunted-pacman') => {
    const filtered = gameName 
      ? gameSessions.filter(s => s.gameName === gameName)
      : gameSessions;

    const totalGames = filtered.length;
    const wins = filtered.filter(s => s.result === 'won').length;
    const losses = filtered.filter(s => s.result === 'lost').length;
    const highScore = Math.max(0, ...filtered.map(s => s.score));
    const totalScore = filtered.reduce((sum, s) => sum + s.score, 0);
    const avgScore = totalGames > 0 ? Math.floor(totalScore / totalGames) : 0;
    const bestTime = Math.min(Infinity, ...filtered.filter(s => s.result === 'won').map(s => s.duration));

    return {
      totalGames,
      wins,
      losses,
      winRate: totalGames > 0 ? Math.floor((wins / totalGames) * 100) : 0,
      highScore,
      avgScore,
      bestTime: bestTime === Infinity ? 0 : bestTime,
    };
  }, [gameSessions]);

  const getRecentSessions = useCallback((limit: number = 10) => {
    return gameSessions.slice(0, limit);
  }, [gameSessions]);

  const clearGameArchive = useCallback(() => {
    setGameSessions([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    gameSessions,
    saveGameSession,
    getGameStats,
    getRecentSessions,
    clearGameArchive,
  };
};
