import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect } from "react";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";
import { getCurrentEmployee } from "../../store/actions/employeeActions";
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
import { useNavigate } from "react-router-dom";
import { getRouteRole } from "../../utils/getRouteRole";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const thunkDispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUserDetails } = useSelector(
    (state: RootState) => state.employee
  );
  useEffect(() => {
    thunkDispatch(getCurrentEmployee());
  }, []);
  if (!currentUserDetails) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No profile data available</Typography>
      </Box>
    );
  }
  console.log("current user", currentUserDetails);

  const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    <Grid>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value || "-"}
      </Typography>
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#EFE6F6",
        padding: "80px 24px 40px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "85%",
          margin: "auto",
          p: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.9)",
        }}
      >
        {/* HEADER */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT SIDE: Avatar + Details */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Avatar
              sx={{ width: 60, height: 60, bgcolor: "#5E2E91", fontSize: 20 }}
            >
              {currentUserDetails.employeeName?.[0]}
            </Avatar>

            <Box>
              <Typography variant="h5" fontWeight="bold" color="#48206F">
                {currentUserDetails.employeeName}
              </Typography>

              <Typography color="text.secondary">
                {currentUserDetails.employeeId} • {currentUserDetails.role}
              </Typography>

              <Typography variant="body2">{user?.email}</Typography>
            </Box>
          </Stack>

          {/* RIGHT SIDE: Update Profile Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5E2E91",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "#48206F",
              },
            }}
            onClick={() => {
              const routeRole = getRouteRole(user?.role);
              navigate(`/${routeRole}/form`);
            }}
          >
            Update Profile
          </Button>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* BASIC DETAILS */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Basic Details
        </Typography>
        <Grid container spacing={3} mb={4}>
          <InfoRow label="Employee ID" value={currentUserDetails.employeeId} />
          <InfoRow
            label="Employee Name"
            value={currentUserDetails.employeeName}
          />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow
            label="Contact Number"
            value={currentUserDetails.contactNumber}
          />
          <InfoRow
            label="Date of Birth"
            value={currentUserDetails.dob?.substring(0, 10)}
          />
          <InfoRow
            label="Work Location"
            value={currentUserDetails.workLocation}
          />
        </Grid>

        {/* EMPLOYMENT INFO */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Employment Information
        </Typography>
        <Grid container spacing={3} mb={4}>
          <InfoRow
            label="Employment Type"
            value={currentUserDetails.employmentType}
          />
          <InfoRow label="Role" value={currentUserDetails.role} />
          <InfoRow label="Department" value={currentUserDetails.department} />
          <InfoRow label="Team" value={currentUserDetails.team} />
          <InfoRow
            label="Manager"
            value={currentUserDetails.managerId?.employeeName}
          />
          <InfoRow
            label="Business Unit"
            value={currentUserDetails.businessUnitId?.name}
          />
        </Grid>

        {/* EXPERIENCE */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Experience
        </Typography>
        <Grid container spacing={3} mb={4}>
          <InfoRow
            label="Total Experience"
            value={`${currentUserDetails.totalExperience || 0} years`}
          />
          <InfoRow
            label="Previous Projects"
            value={currentUserDetails.previousProjects?.join(", ")}
          />
          <InfoRow
            label="Previous Companies"
            value={currentUserDetails.previousCompanies?.join(", ")}
          />
          <InfoRow
            label="Current Projects"
            value={currentUserDetails.currentProjects?.join(", ")}
          />
        </Grid>

        {/* SKILLS */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Skills
        </Typography>
        {/* <Stack direction="row" flexWrap="wrap" gap={1}>
          {currentUserDetails?.skills?.length > 0 ? (
            currentUserDetails?.skills.map((skill: any, index: number) => (
              <Chip
                key={index}
                label={`${skill.skillName} • ${skill.proficiencyLevel} • ${skill.experience} yrs`}
                sx={{ fontWeight: 500 }}
              />
            ))
          ) : (
            <Typography color="text.secondary">No skills added</Typography>
          )}
        </Stack> */}

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {currentUserDetails?.skills?.length ? (
            currentUserDetails.skills.map((skill: any, index: number) => (
              <Chip
                key={index}
                label={`${skill.skillName} • ${skill.proficiencyLevel} • ${skill.experience} yrs`}
                sx={{ fontWeight: 500 }}
              />
            ))
          ) : (
            <Typography color="text.secondary">No skills added</Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
