import {useEffect, useState} from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const rawValue = localStorage.getItem(key);

      if (rawValue) {
        return JSON.parse(rawValue);
      }

      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state])

  return [state, setState] as const;
};