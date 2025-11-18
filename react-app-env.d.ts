declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.ComponentType<{
      className?: string
    }>;
  
    const content: string;
    export default content;
  }