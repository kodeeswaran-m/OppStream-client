import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import { logout } from "../store/actions/authActions";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const AdminPage = () => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  console.log("access token", accessToken);
const handleLogout=()=>{
dispatch(logout());
navigate("/login")
}
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <h3>User: {user?.username}</h3>
      <h4>Role: {user?.role}</h4>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default AdminPage;
