import type { DispatchRequest } from '../types';

const STORAGE_KEY = 'galli_dispatch_draft';

export const dispatchStorage = {
  saveDraft(draft: Partial<DispatchRequest>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
      console.error(error);
    }
  },

  getDraft(): Partial<DispatchRequest> | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  clearDraft(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
    }
  },
};
