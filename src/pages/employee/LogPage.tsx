import { useSelector, useDispatch } from "react-redux";
import LogForm from "../../components/LogForm";
import type { RootState } from "../../store";
import LOGForm from "../../components/LogForm";

const LogPage = () => {
//   const dispatch = useDispatch();
  const currentUser = useSelector((s: RootState) => s.employee.currentUserDetails);

  const handleSubmit = async (payload: any) => {
    // dispatch redux action or call API
    // await dispatch(submitLog(payload) as any);
    console.log("logForm", payload);
    // navigate or show toast
  };

  return <LOGForm/>;
  // return <LogForm initialEmployee={currentUser} onSubmit={handleSubmit} />;
};

export default LogPage;
