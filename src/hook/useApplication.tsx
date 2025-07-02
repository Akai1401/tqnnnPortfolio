import { useContextStore } from '@/context/store';
import { setInterceptorToken } from '@/fetching/client/config';

import useStore from '@/store';
import { setCookie } from '@/utils/cookie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

const useApplication = () => {
  const setUserData = useStore((state) => state.setUserData);
  const { startTransition: globalStartTransition } = useContextStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleLogout = async () => {
    globalStartTransition(() => {});
    setCookie('access_token', '');
    setInterceptorToken(undefined);
    setUserData(undefined);
  };

  const getProfile = async () => {
    try {
      // const res = await fetchProfile('me');
      // setUserData(res?.data);
      // return res?.data;
    } catch (err: any) {
      console.log('Error to get pro5: ' + err);
      return null;
    }
  };

  return {
    handleLogout,
    getProfile,
  };
};

export default useApplication;
