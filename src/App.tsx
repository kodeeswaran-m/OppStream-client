import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import Dashboard from "./pages/Dashboard";
import RoleRoute from "./routes/RoleRoute";
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";
import DeliveryPage from "./pages/DeliveryPage";
import PublicRoute from "./routes/PublicRoute";
import Unauthorized from "./pages/Unauthorized";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import type { RootState } from "./store";
import { loadUser } from "./store/actions/authActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

function App() {
    const dispatch:AppDispatch=useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch]) 
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />

        {/* EMPLOYEE */}
        <Route 
          path="/employeeDashboard" 
          element={
            <RoleRoute allowedRoles={["employee"]}>
              <Dashboard />
            </RoleRoute>
          } 
        />

        {/* MANAGER */}
        <Route 
          path="/reportingManagerDashboard" 
          element={
            <RoleRoute allowedRoles={["reporting manager"]}>
              <ManagerPage />
            </RoleRoute>
          } 
        />

        {/* DELIVERY MANAGER */}
        <Route 
          path="/associateManagerDashboard" 
          element={
            <RoleRoute allowedRoles={["associate manager"]}>
              <DeliveryPage />
            </RoleRoute>
          } 
        />

        {/* VP */}
        <Route 
          path="/vpDashboard" 
          element={
            <RoleRoute allowedRoles={["VP"]}>
              <AdminPage />
            </RoleRoute>
          } 
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;





// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/LoginPage";
// import Signup from "./components/SignupPage";
// import Dashboard from "./pages/Dashboard";
// import RoleRoute from "./routes/RoleRoute";
// import Unauthorized from "./pages/Unauthorized";
// import AdminPage from "./pages/AdminPage";
// import ManagerPage from "./pages/ManagerPage";
// import DeliveryPage from "./pages/DeliveryPage";
// import PublicRoute from "./routes/PublicRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
       
//          <Route
//            path="/login"
//            element={
//              <PublicRoute>
//                <Login />
//              </PublicRoute>
//            }
//          />
//          <Route
//            path="/signup"
//            element={
//              <PublicRoute>
//                <Signup />
//              </PublicRoute>
//            }
//          />

//         {/* open dashboard to all authenticated users */}
//         <Route
//           path="/dashboard"
//           element={<RoleRoute allowedRoles={['employee']}><Dashboard/></RoleRoute>}
//         />

//         {/* manager-only */}
//         <Route
//           path="/manager"
//           element={<RoleRoute allowedRoles={['manager']}><ManagerPage/></RoleRoute>}
//         />

//         {/* delivery manager */}
//         <Route
//           path="/delivery"
//           element={<RoleRoute allowedRoles={['Delivery manager']}><DeliveryPage/></RoleRoute>}
//         />

//         {/* vp-only */}
//         <Route
//           path="/admin"
//           element={<RoleRoute allowedRoles={['VP']}><AdminPage/></RoleRoute>}
//         />

//         <Route path="/unauthorized" element={<Unauthorized />} />
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Login from "./components/LoginPage";
// import Signup from "./components/SignupPage";
// import Dashboard from "./components/Dashboard";
// import PublicRoute from "./routes/PublicRoute";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { loadUser } from "./store/actions/authActions";

// import type { ThunkDispatch } from "redux-thunk";
// import { type AnyAction } from "redux";
// import type { RootState } from "./store";

// type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

// const App = () => {
  // const dispatch:AppDispatch=useDispatch();
  // useEffect(()=>{
  //   dispatch(loadUser())
  // },[dispatch])
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <Signup />
//             </PublicRoute>
//           }
//         />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Default */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
