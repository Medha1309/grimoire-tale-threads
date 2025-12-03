/**
 * Investigation Board Hook
 * Figma-inspired state management with undo/redo
 */

import { useState, useCallback, useEffect } from 'react';
import { InvestigationBoard, InvestigationElement, HistoryState, ViewportState } from '../types/investigationScrapbook';

const MAX_HISTORY = 50;

export function useInvestigationBoard(initialBoard: InvestigationBoard) {
  const [board, setBoard] = useState<InvestigationBoard>(initialBoard);
  const [viewport, setViewport] = useState<ViewportState>({
    zoom: 1,
    pan: { x: 0, y: 0 },
    selectedIds: [],
    clipboardIds: [],
    isDragging: false,
    isConnecting: false,
    tool: 'select',
  });

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([{
    id: Date.now().toString(),
    timestamp: new Date(),
    action: 'Initial',
    elements: initialBoard.elements,
  }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Save to history
  const saveToHistory = useCallback((action: string, elements: InvestigationElement[]) => {
    const newState: HistoryState = {
      id: Date.now().toString(),
      timestamp: new Date(),
      action,
      elements: JSON.parse(JSON.stringify(elements)), // Deep clone
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newState);
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setBoard(prev => ({ ...prev, elements: prevState.elements }));
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setBoard(prev => ({ ...prev, elements: nextState.elements }));
      setHistoryIndex(prev => prev + 1);
    }
  }, [history, historyIndex]);

  // Add element
  const addElement = useCallback((element: InvestigationElement) => {
    setBoard(prev => {
      const newElements = [...prev.elements, element];
      saveToHistory(`Add ${element.type}`, newElements);
      return { ...prev, elements: newElements };
    });
  }, [saveToHistory]);

  // Update element
  const updateElement = useCallback((id: string, updates: Partial<InvestigationElement>) => {
    setBoard(prev => {
      const newElements = prev.elements.map(el =>
        el.id === id ? { ...el, ...updates } as InvestigationElement : el
      );
      saveToHistory(`Update ${updates.type || 'element'}`, newElements);
      return { ...prev, elements: newElements };
    });
  }, [saveToHistory]);

  // Delete elements
  const deleteElements = useCallback((ids: string[]) => {
    setBoard(prev => {
      const newElements = prev.elements.filter(el => !ids.includes(el.id));
      saveToHistory(`Delete ${ids.length} element(s)`, newElements);
      return { ...prev, elements: newElements };
    });
    setViewport(prev => ({ ...prev, selectedIds: [] }));
  }, [saveToHistory]);

  // Duplicate elements
  const duplicateElements = useCallback((ids: string[]) => {
    setBoard(prev => {
      const toDuplicate = prev.elements.filter(el => ids.includes(el.id));
      const duplicated = toDuplicate.map(el => ({
        ...el,
        id: `${el.id}-copy-${Date.now()}`,
        position: { x: el.position.x + 5, y: el.position.y + 5 },
      }));
      const newElements = [...prev.elements, ...duplicated];
      saveToHistory(`Duplicate ${ids.length} element(s)`, newElements);
      return { ...prev, elements: newElements };
    });
  }, [saveToHistory]);

  // Bring to front
  const bringToFront = useCallback((ids: string[]) => {
    setBoard(prev => {
      const maxZ = Math.max(...prev.elements.map(el => el.zIndex), 0);
      const newElements = prev.elements.map(el =>
        ids.includes(el.id) ? { ...el, zIndex: maxZ + 1 } : el
      );
      saveToHistory('Bring to front', newElements);
      return { ...prev, elements: newElements };
    });
  }, [saveToHistory]);

  // Send to back
  const sendToBack = useCallback((ids: string[]) => {
    setBoard(prev => {
      const minZ = Math.min(...prev.elements.map(el => el.zIndex), 0);
      const newElements = prev.elements.map(el =>
        ids.includes(el.id) ? { ...el, zIndex: minZ - 1 } : el
      );
      saveToHistory('Send to back', newElements);
      return { ...prev, elements: newElements };
    });
  }, [saveToHistory]);

  // Select elements
  const selectElements = useCallback((ids: string[], addToSelection = false) => {
    setViewport(prev => ({
      ...prev,
      selectedIds: addToSelection ? [...prev.selectedIds, ...ids] : ids,
    }));
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    setViewport(prev => ({ ...prev, selectedIds: [] }));
  }, []);

  // Zoom
  const setZoom = useCallback((zoom: number) => {
    setViewport(prev => ({ ...prev, zoom: Math.max(0.1, Math.min(5, zoom)) }));
  }, []);

  // Pan
  const setPan = useCallback((pan: { x: number; y: number }) => {
    setViewport(prev => ({ ...prev, pan }));
  }, []);

  // Set tool
  const setTool = useCallback((tool: ViewportState['tool']) => {
    setViewport(prev => ({ ...prev, tool }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;

      // Undo
      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Redo
      if (ctrl && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (viewport.selectedIds.length > 0) {
          e.preventDefault();
          deleteElements(viewport.selectedIds);
        }
      }

      // Duplicate
      if (ctrl && e.key === 'd') {
        e.preventDefault();
        if (viewport.selectedIds.length > 0) {
          duplicateElements(viewport.selectedIds);
        }
      }

      // Select all
      if (ctrl && e.key === 'a') {
        e.preventDefault();
        selectElements(board.elements.map(el => el.id));
      }

      // Escape - clear selection
      if (e.key === 'Escape') {
        clearSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, deleteElements, duplicateElements, selectElements, clearSelection, viewport.selectedIds, board.elements]);

  return {
    board,
    viewport,
    history: {
      canUndo: historyIndex > 0,
      canRedo: historyIndex < history.length - 1,
      currentAction: history[historyIndex]?.action || '',
      undo,
      redo,
    },
    actions: {
      addElement,
      updateElement,
      deleteElements,
      duplicateElements,
      bringToFront,
      sendToBack,
      selectElements,
      clearSelection,
      setZoom,
      setPan,
      setTool,
    },
  };
}
