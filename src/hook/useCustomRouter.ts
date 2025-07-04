import useStore from '@/store';

const useCustomRouter = () => {
  const setIsChangingPage = useStore((state: any) => state.setIsChangingPage);
  const setNextPathname = useStore((state: any) => state.setNextPathname);

  return {
    push: (path: string, ...params: any) => {
      setNextPathname(path);
      setIsChangingPage(true);
    },
  };
};

export default useCustomRouter;
