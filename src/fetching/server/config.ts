'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function saveHttpOnlyCookie(request: any) {
  const { key, value } = request;
  (await cookies()).set({
    name: key,
    value,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
}

export const getHttpOnlyCookieFromServer = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const revalidateNextData = async (tagName: string) => {
  revalidateTag(tagName);
};
