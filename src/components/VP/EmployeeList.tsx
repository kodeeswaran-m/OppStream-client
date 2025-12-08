import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../../store/reducers/employeeReducer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { getEmployees } from "../../store/actions/employeeActions";
import { useEffect } from "react";
import { Grid,Box, Typography } from "@mui/material";

const EmployeeList = () => {
  const { employees } = useSelector((state: RootState) => state.employee);
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
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        Employee Directory
      </Typography>

      <Grid container spacing={3}>
        {employees.map((employee: Employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </Grid>
    </Box>
  );
};

export default EmployeeList;
