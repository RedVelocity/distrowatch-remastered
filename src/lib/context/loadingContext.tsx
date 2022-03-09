import { createContext, useState } from 'react';
import Loader from '../../components/Loader';

const LoadingContext = createContext(undefined);

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <Loader />
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContextProvider, LoadingContext };
