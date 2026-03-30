'use client';

import dynamic from 'next/dynamic';

const CollaborativeEditor = dynamic(
    () => import('./CollaborativeEditor'),
    { ssr: false },
);

export default function EditorClient() {
    return <CollaborativeEditor />;
}