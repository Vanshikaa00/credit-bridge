// UploadContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface LoanOption {
  id: string;
  amount: number;
  apr: number;
  term: number;
  monthlyPayment: number;
  type: string;
  recommended: boolean;
}

interface ScoreFactors {
  category: string;
  impact: "positive" | "negative" | "neutral";
  score: number;
  description: string;
  weight: number;
}

type UploadData = {
  assessmentSummary: any;
  userDetails: any;
  creditScore: any;
  scoreFactors: ScoreFactors[];
  loanOptions: LoanOption[];
  fileName: string;
  fileContent: string;
  // Add more fields as needed
};

type UploadContextType = {
  data: UploadData | null;
  setData: (data: UploadData) => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<UploadData | null>(null);

  return (
    <UploadContext.Provider value={{ data, setData }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};
