import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";

import { getDepartmentStats } from "../../services/adminService";
import { getBusinessUnits } from "../../store/actions/adminActions";
import PieChartSkeleton from "../../components/admin/PieChartSkeleton";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
const MILD_COLORS = [
  "#c4b5fd", // soft purple
  "#93c5fd", // soft blue
  "#fdba74", // soft orange
  "#86efac", // soft green
  "#fca5a5", // soft red
  "#fde68a", // soft yellow
];

const DepartmentPieChart = () => {
  const dispatch: AppDispatch = useDispatch();

  const { businessUnits } = useSelector((state: RootState) => state.admin);

  const [department, setDepartment] = useState("all");
  const [chartType, setChartType] = useState<"department" | "team">(
    "department"
  );
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getBusinessUnits() as any);
  }, [dispatch]);

  useEffect(() => {
    fetchStats();
  }, [department]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getDepartmentStats(department);
      setChartType(res.type);
      const formatted = Object.entries(res.data).map(([key, value], index) => ({
        id: index,
        value,
        label: key,
        color: MILD_COLORS[index % MILD_COLORS.length], 
      }));

      setChartData(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        width: "450px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        {chartType === "department"
          ? "Department Distribution"
          : `${department} - Team Distribution`}
      </Typography>

      {/* Dropdown */}
      <FormControl size="small" sx={{ width: 200, mb: 3 }}>
        <InputLabel>Select Department</InputLabel>
        <Select
          value={department}
          label="Select Department"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <MenuItem value="all">All Departments</MenuItem>
          {businessUnits.map((bu) => (
            <MenuItem value={bu.name}>{bu.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <PieChartSkeleton />
        </Box>
      ) : chartData.length === 0 ? (
        <Typography textAlign="center" py={3} fontSize={16}>
          No data available
        </Typography>
      ) : (
        <Box display="flex" justifyContent="center">
          <PieChart
            // key={windowWidth}
            height={260}
            margin={{ top: 20, bottom: 20 }}
            series={[
              {
                startAngle: -90,
                endAngle: 270,
                paddingAngle: 1,
                // innerRadius: "55%",
                // outerRadius: "85%",
                data: chartData,

                highlightScope: { fade: "global", highlight: "item" },
                highlighted: { additionalRadius: 4 },
                cornerRadius: 4,
                arcLabelRadius: "70%",
              },
            ]}
            sx={{
              "& .MuiPieArc-root": {
                transition: "all 0.25s ease",
              },
            }}
            slotProps={{
              legend: {
                position: { vertical: "bottom", horizontal: "center" },
                sx: { mt: 2 },
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default DepartmentPieChart;
