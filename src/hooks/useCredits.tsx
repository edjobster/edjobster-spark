import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { mockAICreditsStats, AICreditsStats, AIUsageRecord, mockAIUsageRecords } from '@/data/mockAICredits';

interface CreditsContextType {
  credits: AICreditsStats;
  usageRecords: AIUsageRecord[];
  remaining: number;
  isLow: boolean;
  isEmpty: boolean;
  hasEnoughCredits: (cost: number) => boolean;
  consumeCredits: (cost: number, documentInfo: Omit<AIUsageRecord, 'id' | 'creditsUsed'>) => void;
  addCredits: (amount: number) => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState<AICreditsStats>(mockAICreditsStats);
  const [usageRecords, setUsageRecords] = useState<AIUsageRecord[]>(mockAIUsageRecords);

  const remaining = credits.totalCredits - credits.usedCredits;
  const isLow = remaining > 0 && remaining < 5;
  const isEmpty = remaining <= 0;

  const hasEnoughCredits = useCallback((cost: number) => {
    return remaining >= cost;
  }, [remaining]);

  const consumeCredits = useCallback((cost: number, documentInfo: Omit<AIUsageRecord, 'id' | 'creditsUsed'>) => {
    setCredits(prev => ({
      ...prev,
      usedCredits: prev.usedCredits + cost,
    }));
    
    const newRecord: AIUsageRecord = {
      id: `${Date.now()}`,
      ...documentInfo,
      creditsUsed: cost,
    };
    
    setUsageRecords(prev => [newRecord, ...prev]);
  }, []);

  const addCredits = useCallback((amount: number) => {
    setCredits(prev => ({
      ...prev,
      totalCredits: prev.totalCredits + amount,
    }));
  }, []);

  return (
    <CreditsContext.Provider value={{
      credits,
      usageRecords,
      remaining,
      isLow,
      isEmpty,
      hasEnoughCredits,
      consumeCredits,
      addCredits,
    }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = (): CreditsContextType => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
