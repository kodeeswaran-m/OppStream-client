// store/reducers/employeeReducer.ts
import {
  UPSERT_EMP_REQUEST,
  UPSERT_EMP_SUCCESS,
  UPSERT_EMP_FAILURE,
  GET_EMP_REQUEST,
  GET_EMP_SUCCESS,
  GET_EMP_FAILURE,
  GET_SINGLE_EMP_REQUEST,
  GET_SINGLE_EMP_SUCCESS,
  GET_SINGLE_EMP_FAILURE,
  GET_MANAGERS_REQUEST,
  GET_MANAGERS_SUCCESS,
  GET_MANAGERS_FAILURE,
  GET_CURRENT_EMP_REQUEST,
  GET_CURRENT_EMP_SUCCESS,
  GET_CURRENT_EMP_FAILURE,
} from "../constants/employeeConstants";

export interface Employee {
  _id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  role: string;
  businessUnitId: string;
  managerId?: string;
  ancestors?: string[];
}

interface EmployeeState {
  loading: boolean;
  error: string | null;
  message: string | null;
  employees: Employee[];
  selectedEmployee: Employee | null;
  managers: Employee[];
  currentUserDetails: Employee | null; // ⭐ NEW FIELD
}

const initialState: EmployeeState = {
  loading: false,
  error: null,
  message: null,
  employees: [],
  selectedEmployee: null,
  managers: [],
  currentUserDetails: null, // ⭐ NEW FIELD
};

export const employeeReducer = (
  state = initialState,
  action: any
): EmployeeState => {
  switch (action.type) {
    // -------- UPSERT ----------
    case UPSERT_EMP_REQUEST:
      return { ...state, loading: true, error: null };

    case UPSERT_EMP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    case UPSERT_EMP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // -------- GET ALL ----------
    case GET_EMP_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_EMP_SUCCESS:
      return { ...state, loading: false, employees: action.payload };

    case GET_EMP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // -------- GET BY ID ----------
    case GET_SINGLE_EMP_REQUEST:
      return { ...state, loading: true };

    case GET_SINGLE_EMP_SUCCESS:
      return { ...state, loading: false, selectedEmployee: action.payload };

    case GET_SINGLE_EMP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // ---------------- GET MANAGERS ----------------
    case GET_MANAGERS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_MANAGERS_SUCCESS:
      return { ...state, loading: false, managers: action.payload };

    case GET_MANAGERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_CURRENT_EMP_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_CURRENT_EMP_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUserDetails: action.payload,
      };

    case GET_CURRENT_EMP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
