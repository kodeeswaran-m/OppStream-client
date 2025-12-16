import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../../store/reducers/employeeReducer";
import type { AppDispatch, RootState } from "../../store";
import { getEmployees } from "../../store/actions/employeeActions";

const EmployeeList = () => {
  const { employees, loading, error } = useSelector(
    (state: RootState) => state.employee
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <Box
      sx={{
        px: 3,
        py: 4,
        backgroundColor: "#f5f5f7",
        minHeight: "100vh",
      }}
    >
      {/* ---------- HEADER ---------- */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        Employee Directory
      </Typography>

      {/* ---------- LOADING ---------- */}
      {loading && (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          Loading employees...
        </Typography>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      )}

      {/* ---------- TABLE ---------- */}
      {!loading && !error && employees.length > 0 && (
        <EmployeeCard employees={employees as Employee[]} />
      )}

      {/* ---------- EMPTY STATE ---------- */}
      {!loading && !error && employees.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          No employees found
        </Typography>
      )}
    </Box>
  );
};

export default EmployeeList;
