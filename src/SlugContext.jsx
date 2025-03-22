import React, { createContext, useState, useContext } from 'react';

const SlugContext = createContext();

export const SlugProvider = ({ children }) => {
  const [slugs, setSlugs] = useState('');

  return (
    <SlugContext.Provider value={{ slugs, setSlugs }}>
      {children}
    </SlugContext.Provider>
  );
};

export const useSlug = () => useContext(SlugContext);
