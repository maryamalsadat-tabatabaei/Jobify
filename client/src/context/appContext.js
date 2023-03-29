import React, { useEffect, useContext, useReducer } from "react";
import reducer from "./reducer";
import * as actions from "./actions";

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alerttype: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: actions.DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: actions.CLEAR_ALERT });
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider, initialState };
