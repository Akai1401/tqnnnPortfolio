import { useContextStore } from '@/context/store';
import useStore from '@/store';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useEffect } from 'react';

const useCustomRouter = () => {
  const nextRouter = useRouter();
  const { startTransition } = useContextStore();

  return {
    push: (path: string, ...params: any) => {
      startTransition(() => {
        nextRouter.push(path, ...params);
      });
    },
  };
};

export default useCustomRouter;
