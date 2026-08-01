import { useEffect, useRef } from 'react';

export function useChatScroll<T>(dependency: T) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependency]);

  return bottomRef;
}
