'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DiwaliGame = dynamic(() => import('@/components/DiwaliGame'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-orange-900 to-yellow-900">
      <div className="text-center">
        <div className="text-6xl mb-4">🪔</div>
        <div className="text-white text-2xl font-bold">Loading Diwali Magic...</div>
        <div className="text-yellow-300 text-lg mt-2">दीपावली की शुभकामनाएं</div>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <DiwaliGame />
      </Suspense>
    </main>
  );
}
