import { createFileRoute } from '@tanstack/react-router';
import Editor from '@/libs/ui/src/lib/editor';
import React from 'react';

export const Route = createFileRoute('/_layout/menu8/menu9')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Lexical Editor</h1>
      <div className={'pt-10'}>
        <Editor />
      </div>
    </div>
  );
}
