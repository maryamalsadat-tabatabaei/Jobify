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
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    }
    case actions.CLEAR_VALUES: {
      const initialjobState = {
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation || "",
        jobType: "full-time",
        jobStatus: "pending",
      };
      return { ...state, ...initialjobState };
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
    case actions.GET_JOBS_PENDING: {
      return { ...state, isLoading: true, showAlert: false };
    }
    case actions.GET_JOBS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numberOfPages,
      };
    }
    case actions.GET_JOBS_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case actions.SET_EDIT_JOB: {
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        jobStatus: status,
      };
    }
    case actions.DELETE_JOB_PENDING: {
      return { ...state, isLoading: true };
    }
    case actions.EDIT_JOB_PENDING: {
      return { ...state, isLoading: true };
    }
    case actions.EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Job Updated!",
      };
    }
    case actions.EDIT_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case actions.SHOW_STATS_PENDING: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }
    case actions.SHOW_STATS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyStats: action.payload.monthlyStats,
      };
    }
    case actions.CLEAR_FILTERS: {
      return {
        ...state,
        page: 1,
        searchPosition: "",
        searchCompany: "",
        searchStatus: "all",
        searchJobType: "all",
        sort: "latest",
      };
    }
    case actions.CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload.page,
      };
    }
    case actions.PAYMENT_PENDING: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }
    case actions.PAYMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    }
    case actions.SEND_EMAIL_PENDING: {
      return { ...state, isLoading: true };
    }
    case actions.SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Email Sent!",
      };
    }
    case actions.SEND_EMAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case actions.CLEAR_EMAIL_VALUES: {
      return {
        ...state,
        title: "",
        subject: "",
        body: "",
        recipients: [],
      };
    }
    case actions.GOOGLE_SIGN_IN: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    default:
      throw new Error(`no such action: ${action.type}`);
  }
};
export default reducer;
