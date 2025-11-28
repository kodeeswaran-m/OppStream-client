// store/reducers/adminReducer.ts

import {
  CREATE_BU_REQUEST,
  CREATE_BU_SUCCESS,
  CREATE_BU_FAILURE,
  GET_BU_REQUEST,
  GET_BU_SUCCESS,
  GET_BU_FAILURE,
} from "../constants/adminConstants";

export interface BusinessUnit {
  _id: string;
  name: string;
}

interface AdminState {
  loading: boolean;
  error: string | null;
  message: string | null;
  businessUnits: BusinessUnit[];
}

const initialState: AdminState = {
  loading: false,
  error: null,
  message: null,
  businessUnits: [],
};

export const adminReducer = (state = initialState, action: any): AdminState => {
  switch (action.type) {
    case CREATE_BU_REQUEST:
    case GET_BU_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_BU_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: null,
      };

    case GET_BU_SUCCESS:
      return {
        ...state,
        loading: false,
        businessUnits: action.payload,
        error: null,
      };

    case CREATE_BU_FAILURE:
    case GET_BU_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
