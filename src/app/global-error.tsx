'use client';

import useScaleLayout from '@/hook/useScaleLayout';
import useStore from '@/store';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useScaleLayout();

  useEffect(() => {
    console.log('Global-error.tsx BOUNDARY: ', error);
  }, []);

  return (
    <html>
      <body>Some error occurred. Please try again later.</body>
    </html>
  );
}
