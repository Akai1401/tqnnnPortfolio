import useStore from '@/store';
import { usePathname } from 'next/navigation';

const useCustomRouter = () => {
  const setIsChangingPage = useStore((state: any) => state.setIsChangingPage);
  const setNextPathname = useStore((state: any) => state.setNextPathname);
  const setIsShowMenu = useStore((state: any) => state.setIsShowMenu);
  const pathname = usePathname();

  return {
    push: (path: string, ...params: any) => {
      if (pathname === path) {
        setIsShowMenu(false);
        return;
      }
      setIsShowMenu(false);
      setNextPathname(path);
      setIsChangingPage(true);
    },
  };
};

export default useCustomRouter;
