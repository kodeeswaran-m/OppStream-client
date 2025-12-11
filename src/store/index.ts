import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import {employeeReducer} from "./reducers/employeeReducer";
import {adminReducer} from "./reducers/adminReducer";
import authReducer from "./reducers/authReducer";
import { dashboardReducer } from "./reducers/dashboardReducer";
import { adminDashboardReducer } from "./reducers/adminDashboardReducer";

const rootReducer = combineReducers({
  employee: employeeReducer,
  admin: adminReducer,
  auth: authReducer,
   dashboard: dashboardReducer,
    adminDashboard: adminDashboardReducer, // <-- NEW

});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;

// ✅ Add default export so `import store from ...` works
export default store;
