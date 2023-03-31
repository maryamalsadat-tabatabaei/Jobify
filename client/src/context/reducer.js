import * as actions from "./actions";
import { initialState } from "./appContext";

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
    case actions.AUTHENTICATE_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.AUTHENTICATE_USER_SUCCED: {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    }
    case actions.AUTHENTICATE_USER_REJECTED: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case actions.TOGGLE_SIDEBAR: {
      return { ...state, showSidebar: !state.showSidebar };
    }
    case actions.LOGOUT_USER: {
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };
    }
    case actions.UPDATE_USER_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.UPDATE_USER_SUCCED: {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated!",
      };
    }
    case actions.UPDATE_USER_REJECTED: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case actions.HANDLE_CHANGE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case actions.CLEAR_VALUES: {
      const initialjobState = {
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        jobType: "full-time",
        status: "pending",
      };
      return { ...state, initialjobState };
    }
    case actions.CREATE_JOB_PENDING: {
      return { ...state, isLoading: true };
    }
    case actions.CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New Job Created!",
      };
    }
    case actions.CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    default:
      throw new Error(`no such action: ${action.type}`);
  }
};
export default reducer;
