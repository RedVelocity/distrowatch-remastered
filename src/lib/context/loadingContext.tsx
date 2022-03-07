import { createContext, useState } from 'react';

const LoadingContext = createContext(undefined);

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContextProvider, LoadingContext };
