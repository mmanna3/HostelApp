import { useState } from 'react';

export function useCounterKey(valorInicial = 0): any {
  const [key, setKey] = useState(valorInicial);
  return [key, (): void => setKey((prev: number): number => prev + 1)] as const;
}
