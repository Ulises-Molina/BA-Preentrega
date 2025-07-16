import { createContext, useState, useMemo, useCallback } from 'react';
import React from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = ({ initialPageSize = 15, children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); 
  const pageSize = initialPageSize;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Helpers
  const next = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(safePage);
  }, [totalPages]);

  const reset = () => setCurrentPage(1);

  const value = useMemo(() => ({
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    next,
    prev,
    goToPage,
    setTotalItems,
    reset,
  }), [currentPage, pageSize, totalItems, totalPages, next, prev, goToPage]);

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
