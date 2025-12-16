import  { useEffect, useReducer } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  MenuItem,
  Button,
  Grid,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  createUserLog,
  getCurrentEmployee,
} from "../store/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "../store";
import type { AnyAction } from "redux";
import "./LogFormType";
import { reducer } from "./LogFormActionReducer";
import { useSnackbar } from "../context/SnackbarContext";
import { getRouteRole } from "../utils/getRouteRole";
import { useNavigate } from "react-router-dom";
import type { State } from "./LogFormType";
 
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
 
 
// --------------------- INITIAL STATE ---------------------
const initialState: State = {
  employeeId: "",
  employeeName: "",
  employeeEmail: "",
  department: "",
  team: "",
  manager: "",
  requirementType: "EE",
 
  projectName: "demo",
  clientName: "demo",
  projectCode: "demo",
  urgency: "Immediate",
  meetingType: "Presentation",
  callDate: "2025-12-09",
  screenshot: null,
  peoplePresent: [{ name: "sam" }],
 
  selectedTechnologies: ["React"],
  totalPersons: 4,
  techRows: [{ technology: "React", count: 4 }],
 
  oppCategory: "New Feature",
  shortDescription: "demo des",
  detailedNotes: "demo description",
 
  expectedStart: "2025-12-25",
  expectedEnd: "2027-01-01",
 
  nnDescription: "demo",
  nnClientName: "demo",
  nnSource: "demo",
  nnOppFrom: "demo",
};
 
// ============================================================
//                       COMPONENT
// ============================================================
const LOGForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const thunkDispatch: AppDispatch = useDispatch();
  const { showMessage } = useSnackbar();
  const { currentUserDetails } = useSelector(
    (state: RootState) => state.employee
  );
 
  console.log("state", state.techRows);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  console.log("empllllllll", currentUserDetails);
 
  // ---------------------- AUTO-FILL USER DATA ----------------------
  useEffect(() => {
    thunkDispatch(getCurrentEmployee());
  }, []);
  useEffect(() => {
    const user = {
      employeeId: currentUserDetails?.employeeId,
      employeeName: currentUserDetails?.employeeName,
      employeeEmail: currentUserDetails?.employeeEmail,
      department: currentUserDetails?.department,
      team: currentUserDetails?.team,
      manager: currentUserDetails?.managerId?.employeeName,
    };
 
    for (const key in user) {
      dispatch({
        type: "SET_FIELD",
        field: key as keyof State,
        value: (user as any)[key],
      });
    }
  }, []);
 
  // ---------------------- SUBMIT ----------------------
  const handleSubmit = async () => {
    const payload = {
      requirementType: state.requirementType,
 
      oppFrom:
        state.requirementType === "NN"
          ? undefined
          : {
              projectName: state.projectName,
              clientName: state.clientName,
              projectCode: state.projectCode,
              urgency: state.urgency,
              meetingType: state.meetingType,
              meetingDate: state.callDate,
              meetingScreenshot: state.screenshot,
              peoplePresent: state.peoplePresent,
            },
 
      oppTo:
        state.requirementType === "NN"
          ? undefined
          : {
              technologyRequired: state.selectedTechnologies,
              techRows: state.techRows,
              totalPersons: state.totalPersons,
              category: state.oppCategory,
              shortDescription: state.shortDescription,
              detailedNotes: state.detailedNotes,
            },
 
      nnDetails:
        state.requirementType === "NN"
          ? {
              description: state.nnDescription,
              clientName: state.nnClientName,
              source: state.nnSource,
              oppFrom: state.nnOppFrom,
            }
          : undefined,
 
      timeline: {
        expectedStart: state.expectedStart,
        expectedEnd: state.expectedEnd,
      },
    };
 
    const result = await thunkDispatch(createUserLog(payload));
    if (result.success) {
      showMessage("Log created successfully.");
      const routeRole = getRouteRole(user?.role);
      navigate(`/${routeRole}/dashboard`);
    } else {
      showMessage("Error.");
    }
  };
 
  const canAddMoreRows = () =>
    state.techRows.length < state.selectedTechnologies.length;
 
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 6, // more spacing around the page
        background: "#F7F5FF", // lighter landscape
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          mt: 4, // added
          width: "100%",
          maxWidth: "1100px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} color="#48206F">
          Log Form
        </Typography>
 
        {/* ───────────────────── EMPLOYEE DETAILS ───────────────────── */}
        <Typography variant="h6" fontWeight={"bold"} mb={2}>
          Employee Details
        </Typography>
 
        <Grid container spacing={2}>
          {[
            ["Employee ID", "employeeId"],
            ["Employee Name", "employeeName"],
            ["Employee Email", "employeeEmail"],
            ["Department", "department"],
            ["Team", "team"],
            // ["Reporting Manager", "manager"],
          ].map(([label, field]) => (
            // <Grid key={field}>
            <TextField
              key={field}
              // fullWidth
              label={label}
              size="small"
              value={state[field as keyof State]}
              // sx={fieldStyle}
              disabled
            />
            // </Grid>
          ))}
 
          {/* Requirement Type */}
          <Grid minWidth={190}>
            <TextField
              select
              label="Requirement Type"
              size="small"
              fullWidth
              // sx={fieldStyle}
              value={state.requirementType}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "requirementType",
                  value: e.target.value,
                })
              }
            >
              <MenuItem value="EE">EE</MenuItem>
              <MenuItem value="EN">EN</MenuItem>
              <MenuItem value="NN">NN</MenuItem>
            </TextField>
          </Grid>
        </Grid>
 
        {/* ───────────────────── NN SECTION ───────────────────── */}
        {state.requirementType === "NN" && (
          <>
            <Typography mt={4}  fontWeight={"bold"} variant="h6">
              NN Details
            </Typography>
            <Grid container spacing={2} mt={1}>
              {[
                ["Description", "nnDescription"],
                ["Client Name", "nnClientName"],
                ["Source", "nnSource"],
                ["Opp. From", "nnOppFrom"],
              ].map(([label, field]) => (
                <Grid key={field}>
                  <TextField
                    fullWidth
                    label={label}
                    // sx={fieldStyle}
                    size="small"
                    value={state[field as keyof State]}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: field as keyof State,
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
 
        <Divider sx={{ marginTop: 4 }} />
 
        {/* ───────────────────── OPP FROM (EE/EN only) ───────────────────── */}
        {(state.requirementType === "EE" || state.requirementType === "EN") && (
          <>
            <Typography mt={4}  fontWeight={"bold"} variant="h6">
              Opportunity Source
            </Typography>
 
            <Grid container spacing={2} mt={1}>
              {/* Standard fields */}
              {[
                ["Project Name", "projectName"],
                ["Client Name", "clientName"],
                ["Project Code", "projectCode"],
              ].map(([label, field]) => (
                <Grid key={field} size={3}>
                  <TextField
                    fullWidth
                    label={label}
                    size="small"
                    // sx={fieldStyle}
                    value={state[field as keyof State]}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: field as keyof State,
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
              ))}
 
              {/* Urgency */}
              <Grid size={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Priority Level"
                  // sx={fieldStyle}
                  value={state.urgency}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "urgency",
                      value: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Immediate">Immediate</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                </TextField>
              </Grid>
 
              {/* Meeting Type */}
              <Grid size={3}>
                <TextField
                  select
                  fullWidth
                  label="Meeting Type"
                  // sx={fieldStyle}
                  size="small"
                  value={state.meetingType}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "meetingType",
                      value: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Catchup Call">Catchup Call</MenuItem>
                  <MenuItem value="Review Meeting">Review Meeting</MenuItem>
                  <MenuItem value="Client Meeting">Client Meeting</MenuItem>
                  <MenuItem value="One to One">One to One</MenuItem>
                  <MenuItem value="Presentation">Presentation</MenuItem>
                </TextField>
              </Grid>
 
              {/* Date */}
              <Grid size={3}>
                <TextField
                  type="date"
                  fullWidth
                  label="Date of Discussion"
                  // sx={fieldStyle}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={state.callDate}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "callDate",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
 
              {/* Spacing row */}
              <Grid />
            </Grid>
            {/* People Present */}
            <Grid>
              <Typography fontWeight="bold" mt={2}>
                Participants
              </Typography>
 
              {state.peoplePresent.map((p:{name:string}, i:number) => (
                <Grid
                  container
                  spacing={1}
                  key={i}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Grid>
                    <TextField
                      fullWidth
                      label="Name"
                      // sx={fieldStyle}
                      size="small"
                      value={p.name}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_PEOPLE",
                          index: i,
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
 
                  <Grid>
                    <IconButton
                      color="error"
                      onClick={() =>
                        dispatch({ type: "REMOVE_PEOPLE", index: i })
                      }
                      disabled={state.peoplePresent.length === 1}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
 
              <Button
                sx={{ mt: 2, border: "1px solid #8347ad" }}
                startIcon={<AddCircleIcon />}
                onClick={() => dispatch({ type: "ADD_PEOPLE" })}
              >
                Add Person
              </Button>
            </Grid>
 
            <Divider sx={{ marginTop: 4 }} />
 
            {/* ───────────────────── OPP TO ───────────────────── */}
            <Typography mt={4} fontWeight={"bold"} variant="h6">
              Opportunity To
            </Typography>
 
            <Grid container spacing={2} mt={3}>
              {/* Tech Select */}
              <Grid minWidth={230}>
                <FormControl fullWidth size="small">
                  <InputLabel>Technologies Required</InputLabel>
                  <Select
                    multiple
                    value={state.selectedTechnologies}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_TECHNOLOGIES",
                        value: e.target.value as string[],
                      })
                    }
                    input={<OutlinedInput label="Technologies Required" />}
                  >
                    {["React", "Angular", "Python", "Java", "Node"].map(
                      (tech) => (
                        <MenuItem key={tech} value={tech}>
                          {tech}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
 
              {/* Total Persons */}
              <Grid minWidth={230}>
                <TextField
                  label="Total Persons"
                  value={state.totalPersons}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>
            </Grid>
 
            {/* Add Tech Row */}
            <Box mt={2}>
              <Button
                variant="outlined"
                startIcon={<AddCircleIcon />}
                disabled={!canAddMoreRows()}
                onClick={() => dispatch({ type: "ADD_TECH_ROW" })}
                sx={{ mb: 2 }}
              >
                Add Technology Row
              </Button>
            </Box>
 
            {/* Dynamic Tech Rows */}
            {state.techRows.map((row:{technology:string, count:number}, index:number) => (
              <Grid
                container
                spacing={2}
                alignItems="center"
                key={index}
                sx={{ mt: 1 }}
              >
                <Grid minWidth={230}>
                  <TextField
                    select
                    fullWidth
                    label="Technology"
                    // sx={fieldStyle}
                    size="small"
                    value={row.technology}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_TECH_ROW",
                        index,
                        field: "technology",
                        value: e.target.value,
                      })
                    }
                  >
                    {state.selectedTechnologies
                      .filter(
                        (tech:string) =>
                          tech === row.technology ||
                          !state.techRows.some((r:{technology:string, count:number}) => r.technology === tech)
                      )
                      .map((tech:string) => (
                        <MenuItem key={tech} value={tech}>
                          {tech}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
 
                <Grid minWidth={230}>
                  <TextField
                    fullWidth
                    label="Needed Count"
                    type="number"
                    // sx={fieldStyle}
                    size="small"
                    value={row.count}
                    inputProps={{ min: 0 }} // 👈 prevents -ve input
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_TECH_ROW",
                        index,
                        field: "count",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>
 
                <Grid>
                  <IconButton
                    color="error"
                    sx={{outline:"none"}}
                    onClick={() => dispatch({ type: "REMOVE_TECH_ROW", index })}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
 
            {/* Category and Notes */}
            <Grid container spacing={2} mt={3}>
              <Grid minWidth={230}>
                <TextField
                  select
                  fullWidth
                  label="Opp. Category"
                  // sx={fieldStyle}
                  size="small"
                  value={state.oppCategory}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "oppCategory",
                      value: e.target.value,
                    })
                  }
                >
                  <MenuItem value="New Feature">New Feature</MenuItem>
                  <MenuItem value="Migration">Migration</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>
 
              <Grid minWidth={230}>
                <TextField
                  fullWidth
                  label="Short Description"
                  // sx={fieldStyle}
                  size="small"
                  value={state.shortDescription}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "shortDescription",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
 
              <Grid minWidth={230}>
                <TextField
                  fullWidth
                  label="Detailed Notes"
                  multiline
                  rows={1}
                  // sx={fieldStyle}
                  size="small"
                  value={state.detailedNotes}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "detailedNotes",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </>
        )}
 
        <Divider sx={{ marginTop: 4 }} />
 
        {/* ───────────────────── TIMELINE ───────────────────── */}
        <Typography mt={4} fontWeight={"bold"} variant="h6">
          Expected Timeline
        </Typography>
 
        <Grid container spacing={2} mt={1}>
          <Grid minWidth={230}>
            <TextField
              type="date"
              fullWidth
              label="Expected Start Date"
              // sx={fieldStyle}
              size="small"
              InputLabelProps={{ shrink: true }}
              value={state.expectedStart}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "expectedStart",
                  value: e.target.value,
                })
              }
            />
          </Grid>
 
          <Grid minWidth={230}>
            <TextField
              type="date"
              fullWidth
              label="Expected End Date"
              // sx={fieldStyle}
              size="small"
              InputLabelProps={{ shrink: true }}
              value={state.expectedEnd}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "expectedEnd",
                  value: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
 
        {/* Submit */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            sx={{
              px: 2,
              py: 0.2,
              background: "#7E57C2",
              fontSize: "1rem",
            }}
            size="small"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
 
export default LOGForm;