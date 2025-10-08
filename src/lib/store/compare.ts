'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company } from '../types';

interface CompareState {
  selectedCompanies: Company[];
  maxSelections: number;
  addCompany: (company: Company) => void;
  removeCompany: (companyId: string) => void;
  clearAll: () => void;
  isInCompare: (companyId: string) => boolean;
  canAddMore: () => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedCompanies: [],
      maxSelections: 3,

      addCompany: (company: Company) => {
        const { selectedCompanies, maxSelections } = get();
        
        // Don't add if already in compare
        if (selectedCompanies.some(c => c.id === company.id)) {
          return;
        }
        
        // Don't add if at max capacity
        if (selectedCompanies.length >= maxSelections) {
          return;
        }
        
        set({
          selectedCompanies: [...selectedCompanies, company]
        });
      },

      removeCompany: (companyId: string) => {
        const { selectedCompanies } = get();
        set({
          selectedCompanies: selectedCompanies.filter(c => c.id !== companyId)
        });
      },

      clearAll: () => {
        set({ selectedCompanies: [] });
      },

      isInCompare: (companyId: string) => {
        const { selectedCompanies } = get();
        return selectedCompanies.some(c => c.id === companyId);
      },

      canAddMore: () => {
        const { selectedCompanies, maxSelections } = get();
        return selectedCompanies.length < maxSelections;
      },
    }),
    {
      name: 'compare-storage',
      partialize: (state) => ({
        selectedCompanies: state.selectedCompanies,
      }),
    }
  )
);
