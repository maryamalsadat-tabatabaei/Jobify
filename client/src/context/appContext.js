import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import * as actions from "./actions";
import axios from "axios";

const AppContext = React.createContext();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alerttype: "",
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: userLocation || "",
  jobLocation: "",
  showSidebar: true,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  status: {},
  monthlyStataus: [],
  searchPosition: "",
  searchCompany: "",
  searchStatus: "all",
  searchJobType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authRequest = axios.create({
    baseURL: "http://localhost:8000/api/v1",
  });

  authRequest.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: actions.DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: actions.CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const authenticateUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: actions.AUTHENTICATE_USER_PENDING });
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: actions.AUTHENTICATE_USER_SUCCED,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (error) {
      dispatch({
        type: actions.AUTHENTICATE_USER_REJECTED,
        payload: { msg: error.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: actions.TOGGLE_SIDEBAR });
  };
  const logoutUser = () => {
    dispatch({ type: actions.LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (userData) => {
    dispatch({ type: actions.UPDATE_USER_PENDING });
    try {
      const response = authRequest.patch("/auth/updateUser", userData);
      const { user, token, location } = response.data;
      dispatch({
        type: actions.UPDATE_USER_SUCCED,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
      // if no token
      // addUserToLocalStorage({ user, location, token: initialState.token });
    } catch (error) {
      if (error.status !== 401) {
        dispatch({
          type: actions.AUTHENTICATE_USER_REJECTED,
          payload: { msg: error.msg },
        });
      }
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: actions.HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: actions.CLEAR_VALUES });
  };
  const createJob = async () => {
    dispatch({ type: actions.CREATE_JOB_PENDING });
    const { company, jobLocation, jobType, position, status } = state;
    try {
      await authRequest.post("/jobs", {
        company,
        jobLocation,
        jobType,
        position,
        status,
      });
      dispatch({ type: actions.CREATE_JOB_SUCCESS });
      dispatch({ type: actions.CLEAR_VALUES });
    } catch (error) {
      if (error.status === 401) return;
      dispatch({
        type: actions.CREATE_JOB_ERROR,
        payload: { msg: error.msg },
      });
    }
    clearAlert();
  };
  const getJobs = async () => {
    const {
      searchCompany,
      searchPosition,
      searchJobType,
      searchStatus,
      sort,
      page,
    } = state;
    let url = `/jobs?page=${page}&jobType=${searchJobType}&status=${searchStatus}&sort=${sort}`;
    if (searchPosition) {
      url = url + `&position=${searchPosition}`;
    }
    if (searchCompany) {
      url = url + `&company=${searchCompany}`;
    }
    dispatch({ type: actions.GET_JOBS_PENDING });
    try {
      const { data } = await authRequest(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: actions.GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      if (error.status === 401) return;
      dispatch({
        type: actions.GET_JOBS_ERROR,
        payload: { msg: error.msg },
      });
    }
    clearAlert();
  };
  const setEditJob = (id) => {
    dispatch({ type: actions.SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: actions.EDIT_JOB_PENDING });
    const { position, company, jobLocation, jobType, status } = state;
    try {
      await authRequest.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: actions.EDIT_JOB_SUCCESS,
      });
      dispatch({ type: actions.CLEAR_VALUES });
    } catch (error) {
      if (error.status === 401) return;
      dispatch({
        type: actions.GET_JOBS_ERROR,
        payload: { msg: error.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (id) => {
    dispatch({ type: actions.DELETE_JOB_PENDING });

    try {
      await authRequest.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {}
  };
  const showStatus = async () => {
    dispatch({ type: actions.SHOW_STATS_PENDING });
    try {
      const { data } = await authRequest("/jobs/stats");
      dispatch({
        type: actions.SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStatus,
          monthlyStatus: data.monthlyStatus,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser()
    }

    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: actions.CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: actions.CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authenticateUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        deleteJob,
        setEditJob,
        editJob,
        showStatus,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider, initialState };
