import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { getCurrentEmployee } from "../../store/actions/employeeActions";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Stack,
  
  Divider,
  Avatar,
} from "@mui/material";

import {
  Email,
  Phone,
  LocationOn,
  
  Work,
 
} from "@mui/icons-material";

const EmployeeDashboard = () => {
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();

  const { currentUserDetails, loading } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    dispatch(getCurrentEmployee());
  }, [dispatch]);


  if (loading || !currentUserDetails) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h6" color="text.secondary">
          Loading employee profile...
        </Typography>
      </Box>
    );
  }

  const emp = currentUserDetails;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F2F2F2",
        px: { xs: 2, md: 5 },
        py: 5,
        mt: 6,
      }}
    >
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Employee Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, {emp.employeeName}
          </Typography>
        </Box>

   
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT PROFILE */}
        <Grid >
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Stack alignItems="center" spacing={1}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "primary.main",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                {getInitials(emp.employeeName)}
              </Avatar>

              <Typography variant="h6" fontWeight={700}>
                {emp.employeeName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {emp.employeeId} • {emp.department}
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              <InfoRow icon={<Email />} label="Email" value={emp.employeeEmail} />
              <InfoRow
                icon={<Phone />}
                label="Contact"
                value={emp.contactNumber??""}
              />
              <InfoRow
                icon={<LocationOn />}
                label="Location"
                value={emp.workLocation??""}
              />
              <InfoRow
                icon={<Work />}
                label="Experience"
                value={`${emp.totalExperience} years`}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip
                label={emp.isAvailable ? "Available" : "Allocated"}
                color={emp.isAvailable ? "success" : "warning"}
              />
              <Chip label={emp.employmentType}  color="secondary" />
              {/* <Chip label={emp.role} color="secondary" /> */}
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT DETAILS */}
        <Grid >
          {/* ORGANIZATION */}
          <Paper sx={{ p: 3, borderRadius: 4, mb: 3 }}>
            <SectionTitle title="Organization Details" />

            <Grid container spacing={2}>
              <Detail label="Team" value={emp.team??""} />
              <Detail
                label="Reporting Manager"
                value={emp.managerId?.employeeName || "—"}
              />
              <Detail
                label="Manager Email"
                value={emp.managerId?.employeeEmail || "—"}
              />
              <Detail
                label="Reporting Level"
                value={`Level ${emp.ancestors?.length || 0}`}
              />
            </Grid>
          </Paper>

          {/* SKILLS */}
          <Paper sx={{ p: 3, borderRadius: 4, mb: 3 }}>
            <SectionTitle title="Skills" />

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {emp.skills?.length ? (
                emp.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={`${skill.skillName} • ${skill.experience} yrs`}
                    color="primary"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography color="text.secondary">
                  No skills added
                </Typography>
              )}
            </Stack>
          </Paper>

          {/* PROJECTS */}
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <SectionTitle title="Projects & History" />

            <Stack spacing={1.5}>
              <Detail
                label="Current Projects"
                value={emp.currentProjects?.join(", ") || "—"}
              />
              <Detail
                label="Previous Projects"
                value={emp.previousProjects?.join(", ") || "—"}
              />
              <Detail
                label="Previous Companies"
                value={emp.previousCompanies?.join(", ") || "—"}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;

/* =======================
   Reusable Components
======================= */

const SectionTitle = ({ title }: { title: string }) => (
  <Typography
    variant="subtitle1"
    fontWeight={700}
    mb={2}
    sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
  >
    {title}
  </Typography>
);

const Detail = ({ label, value }: { label: string; value: string }) => (
  <Grid >
    <Typography variant="body2">
      <b>{label}:</b> {value}
    </Typography>
  </Grid>
);

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center">
    <Box sx={{ color: "primary.main" }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  </Stack>
);
