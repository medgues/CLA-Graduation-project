import { createContext, useEffect, useReducer } from "react";

export const CardContext = createContext();

//reducer
const CardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CARD":
      const newState = () => {
        return [...state.concat(action.item)];
      };
      localStorage.setItem("card", JSON.stringify(newState()));
      console.log("add to card", action.item, state);
      return newState();
    case "CARD":
      return [...action.payload];
    case "REMOVE_FROM_CARD":
      const currentState = JSON.parse(localStorage.getItem("card"));
      const removedProduct = currentState.filter(
        (product) => product._id !== action.id
      );
      localStorage.setItem("card", JSON.stringify(removedProduct));
      return [...removedProduct];
    default:
      return {};
  }
};

export const CardContextProvider = ({ children }) => {
  const initialState = [];
  const [state, dispatch] = useReducer(CardReducer, initialState);

  useEffect(() => {
    const card = JSON.parse(localStorage.getItem("card"));

    if (card) {
      dispatch({ type: "CARD", payload: card });
    }
  }, []);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {console.log("card state", state)}
      {children}
    </CardContext.Provider>
  );
};
