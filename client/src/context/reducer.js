import * as actions from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    }
    case actions.CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    }

    default:
      throw new Error(`no such action: ${action.type}`);
  }
};
export default reducer;
