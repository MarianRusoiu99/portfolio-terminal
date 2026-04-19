import React, { createContext, useContext, ReactNode } from 'react';

// Stub context so we don't break existing components that call useCursor()
// The new cursor is completely autonomous!
type CursorType = 'default' | 'link';

interface CursorContextProps {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  cursorImage: string | null;
  setCursorImage: (image: string | null) => void;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CursorContext.Provider value={{ 
        cursorType: 'default', 
        setCursorType: () => {}, 
        cursorImage: null, 
        setCursorImage: () => {} 
    }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
