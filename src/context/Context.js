import React, { useReducer, useContext, createContext } from "react";
import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

const Context = createContext(initialState);

export const useExpense = () => {
  return useContext(Context);
};

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  const addTransaction = (transaction) =>
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });

  return (
    <Context.Provider
      value={{ deleteTransaction, addTransaction, transactions }}
    >
      {children}
    </Context.Provider>
  );
};
