import { create } from 'zustand';

const useStore = create((set: any) => ({
  userData: undefined,
  setUserData: (userData: any) => set({ userData }),
}));

export default useStore;
