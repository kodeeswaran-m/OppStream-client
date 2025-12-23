import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import { useEffect } from "react";
import { getReportingEmployeeLogs } from "../store/actions/employeeActions";
import type { RootState } from "../store";
import LogsHierarchy from "../components/common/ReportingLineTable/LogsHierarchy";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const EmployeeLogsTable = () => {
  const { reportingEmployeeLogs } = useSelector(
    (state: RootState) => state.employee
  );

  const dispatch: AppDispatch = useDispatch();
  console.log("reporting line employee logs", reportingEmployeeLogs);
  useEffect(() => {
    dispatch(getReportingEmployeeLogs());
  }, []);

  return (
    <>
      <LogsHierarchy data={reportingEmployeeLogs} />
    </>
  );
};

export default EmployeeLogsTable;
