import { useEffect } from "react";

export const useKeyDown=(key, onKeyDown) =>{
    useEffect(() => {
      const handler = e => {
        if (e.key === key) {
          onKeyDown();
        }
      };
  
      window.addEventListener('keydown', handler);
  
      return () => window.removeEventListener('keydown', handler);
    }, [onKeyDown, key]);
  }