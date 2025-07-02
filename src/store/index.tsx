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
  };
});

export default useStore;
