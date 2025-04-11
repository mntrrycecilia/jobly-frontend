import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
  // Read localStorage once when component loads
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  // Update localStorage whenever item changes
  useEffect(() => {
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
