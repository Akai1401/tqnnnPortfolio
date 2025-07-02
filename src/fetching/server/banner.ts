import { REVALIDATE_TIME } from '@/constant';

export const fetchBannerList = async () => {
  const URL = `${process.env.NEXT_PUBLIC_BE_URL}/banner/all`;
  console.log('Url', URL);
  const res = await fetch(URL, {
    method: 'GET',
    cache: 'force-cache',
    next: {
      tags: ['bannerList'],
      revalidate: REVALIDATE_TIME,
    },
  });
  const data = await res.json();
  return data;
};
