import { createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducer";
const SnakbarContext = createContext();

export const SnakbarContextProvider = ({ children }) => {
  const [snakbarStatus, snakbarDispatch] = useReducer(reducer, initialState);

  return (
    <SnakbarContext.Provider
      value={{
        snakbarStatus,
        snakbarDispatch,
      }}>
      {children}
    </SnakbarContext.Provider>
  );
};
export const useSnakbar = () => {
  return useContext(SnakbarContext);
};
