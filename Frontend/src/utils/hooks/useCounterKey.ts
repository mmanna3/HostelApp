import { useState } from 'react';

export function useCounterKey(): any {
  const [key, setKey] = useState(0);
  return [key, (): void => setKey((prev: number): number => prev + 1)] as const;
}
