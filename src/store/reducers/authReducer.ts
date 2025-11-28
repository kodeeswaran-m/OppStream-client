import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
    LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../constants/authConstants";

interface User{
  username?:string,
  email?:string,
  role?:string
}
interface AuthState {
  accessToken: string | null;
  user: User|null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOGOUT_REQUEST: // Set loading state for all requests
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      // Assuming successful sign-up returns user and token for auto-login
      return {
        ...state,
        loading: false,
        error: null,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };

    case LOGOUT_SUCCESS:
      // Crucial step: Reset state to initial state upon successful logout
      return {
        ...initialState,
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case LOGOUT_FAILURE: // Set error, and stop loading
      // If logout fails, we still want to log out locally for security
      if (action.type === LOGOUT_FAILURE) {
        console.error("Server logout failed, but resetting local state.");
        return {
          ...initialState, // Clear token/user locally
          error: action.payload || "Logout failed on server.", // Set the error for display
        };
      }
      // For login/signup failures
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };

    case LOAD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        accessToken: null,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
