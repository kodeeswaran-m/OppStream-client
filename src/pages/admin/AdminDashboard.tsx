import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import { logout } from "../../store/actions/authActions";
import { useEffect } from "react";
import { getUsers } from "../../store/actions/adminActions";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const AdminDashboard = () => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.admin);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  console.log("access token", accessToken);
const handleLogout=()=>{
dispatch(logout());
navigate("/login")
}
useEffect(()=>{
  dispatch(getUsers({ role: "", search:"", page: 1, limit: 20 }))
})
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <h3>User: {user?.username}</h3>
      <h4>Role: {user?.role}</h4>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default AdminDashboard;
