import { PAGE_STATE } from '@/constant';
import { create } from 'zustand';

const useStore = create((set: any) => {
  const initSetState = (stateName: any) => {
    return (update: any) => {
      set((state: any) => ({
        [stateName]:
          typeof update === 'function' ? update(state[stateName]) : update,
      }));
    };
  };

  return {
    userData: undefined,
    setUserData: initSetState('userData'),
    clientWidth: undefined,
    setClientWidth: initSetState('clientWidth'),
    clientHeight: undefined,
    setClientHeight: initSetState('clientHeight'),
    showHeader: false,
    setShowHeader: initSetState('showHeader'),
    welcomeState: PAGE_STATE.LOADING,
    setWelcomeState: initSetState('welcomeState'),
  };
});

export default useStore;
