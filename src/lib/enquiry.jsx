import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const EnquiryCtx = createContext(null);

/** Tiny global "enquiry list" shared by the sweet cards, contact form and floating button. */
export function EnquiryProvider({ children }) {
  const [items, setItems] = useState([]);
  const toggle = useCallback((sweet) => {
    setItems((prev) =>
      prev.some((x) => x.id === sweet.id) ? prev.filter((x) => x.id !== sweet.id) : [...prev, sweet]
    );
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, toggle, clear, has: (id) => items.some((x) => x.id === id) }), [items, toggle, clear]);
  return <EnquiryCtx.Provider value={value}>{children}</EnquiryCtx.Provider>;
}

export const useEnquiry = () => useContext(EnquiryCtx);
