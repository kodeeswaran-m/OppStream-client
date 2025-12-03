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
  CREATE_EMP_LOG_REQUEST,
  CREATE_EMP_LOG_SUCCESS,
  CREATE_EMP_LOG_FAILURE,
  GET_VISIBLE_LOGS_REQUEST,
  GET_VISIBLE_LOGS_SUCCESS,
  GET_VISIBLE_LOGS_FAILURE,
  GET_REPORTING_EMPLOYEE_LOGS_REQUEST,
  GET_REPORTING_EMPLOYEE_LOGS_SUCCESS,
  GET_REPORTING_EMPLOYEE_LOGS_FAILURE,
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
  currentUserDetails: Employee | null;
  userLogs: any[];
  reportingEmployeeLogs: any[];
  userLogscount: number;
  repEmpLogsCount: number;
}

const initialState: EmployeeState = {
  loading: false,
  error: null,
  message: null,
  employees: [],
  selectedEmployee: null,
  managers: [],
  currentUserDetails: null,
  userLogs: [],
  userLogscount: 0,
  reportingEmployeeLogs: [],
  repEmpLogsCount: 0,
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
    case CREATE_EMP_LOG_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_EMP_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        // userLogs: [...state.userLogs, action.payload.log],
      };

    case CREATE_EMP_LOG_FAILURE:
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

    case GET_VISIBLE_LOGS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_VISIBLE_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        userLogs: action.payload.logs,
        userLogscount: action.payload.count,
      };
    case GET_VISIBLE_LOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_REPORTING_EMPLOYEE_LOGS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_REPORTING_EMPLOYEE_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        reportingEmployeeLogs: action.payload.logs,
        repEmpLogsCount: action.payload.count,
      };
    case GET_REPORTING_EMPLOYEE_LOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
