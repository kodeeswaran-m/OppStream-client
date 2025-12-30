import { useEffect, useReducer, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { generateSummaryFromNotes } from "../services/summaryService";
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
import { useParams } from "react-router-dom";
import { getLogById, updateLogById } from "../services/logService";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const initialState: State = {
  employeeId: "",
  employeeName: "",
  employeeEmail: "",
  department: "",
  team: "",
  manager: "",
  requirementType: "EE",

  projectName: "Internal Tool",
  clientName: "demo",
  projectCode: "demo",
  urgency: "Medium",
  meetingType: "Presentation",
  callDate: "2025-12-09",
  screenshot: null,
  peoplePresent: [{ name: "sam" }],

  selectedTechnologies: ["React"],
  totalPersons: 4,
  techRows: [{ technology: "React", count: 4 }],

  oppCategory: "New Feature",
  shortDescription: "demo des",
  detailedNotes:
    "The client is currently using a legacy system that has performance limitations and lacks scalability during peak usage. During the discussion, the client highlighted challenges related to slow response times, manual reporting, and limited integration capabilities with third-party tools.We proposed a phased implementation approach, starting with a proof of concept focused on the most critical workflows. The client showed interest in adopting a modern, cloud-based architecture that supports better performance, security, and future scalability.Key stakeholders requested a detailed cost breakdown, tentative project timeline, and resource allocation plan. A follow-up meeting has been scheduled to present the technical solution, migration strategy, and estimated effort.",
  expectedStart: "2026-01-25",
  expectedEnd: "2027-01-01",

  nnDescription: "demo",
  nnClientName: "demo",
  nnSource: "demo",
  nnOppFrom: "demo",
};
const PROJECT_OPTIONS = [
  "Internal Tool",
  "Client Portal",
  "Analytics Dashboard",
  "Mobile App",
];

const LOGForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const thunkDispatch: AppDispatch = useDispatch();
  const { showMessage } = useSnackbar();
  const { currentUserDetails } = useSelector(
    (state: RootState) => state.employee
  );
  const [generatingSummary, setGeneratingSummary] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  // const today = new Date().toISOString().split("T")[0];

  console.log("id", isEditMode);
  // ---------------------- AUTO-FILL USER DATA ----------------------
  const zoomAnimation = {
    "@keyframes zoomPulse": {
      "0%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.1)" },
      "100%": { transform: "scale(1)" },
    },
  };

  useEffect(() => {
    thunkDispatch(getCurrentEmployee());
  }, []);

  useEffect(() => {
    if (state.requirementType === "EE") {
      dispatch({
        type: "SET_FIELD",
        field: "projectName",
        value: "",
      });
    }
  }, [state.requirementType]);

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
  useEffect(() => {
    if (!isEditMode || !id) return;

    const fetchLog = async () => {
      const res = await getLogById(id);
      const log = res.log;

      // ---- Prefill reducer state ----
      dispatch({
        type: "SET_FIELD",
        field: "requirementType",
        value: log.requirementType,
      });

      if (log.oppFrom) {
        dispatch({
          type: "SET_FIELD",
          field: "projectName",
          value: log.oppFrom.projectName,
        });
        dispatch({
          type: "SET_FIELD",
          field: "clientName",
          value: log.oppFrom.clientName,
        });
        dispatch({
          type: "SET_FIELD",
          field: "projectCode",
          value: log.oppFrom.projectCode,
        });
        dispatch({
          type: "SET_FIELD",
          field: "urgency",
          value: log.oppFrom.urgency,
        });
        dispatch({
          type: "SET_FIELD",
          field: "meetingType",
          value: log.oppFrom.meetingType,
        });
        dispatch({
          type: "SET_FIELD",
          field: "callDate",
          value: log.oppFrom.meetingDate?.split("T")[0],
        });
        dispatch({
          type: "SET_FIELD",
          field: "peoplePresent",
          value: log.oppFrom.peoplePresent,
        });
      }

      if (log.oppTo) {
        dispatch({
          type: "SET_TECHNOLOGIES",
          value: log.oppTo.technologyRequired,
        });
        dispatch({
          type: "SET_FIELD",
          field: "techRows",
          value: log.oppTo.techRows,
        });
        dispatch({
          type: "SET_FIELD",
          field: "totalPersons",
          value: log.oppTo.totalPersons,
        });
        dispatch({
          type: "SET_FIELD",
          field: "oppCategory",
          value: log.oppTo.category,
        });
        dispatch({
          type: "SET_FIELD",
          field: "shortDescription",
          value: log.oppTo.shortDescription,
        });
        dispatch({
          type: "SET_FIELD",
          field: "detailedNotes",
          value: log.oppTo.detailedNotes,
        });
      }

      if (log.nnDetails) {
        dispatch({
          type: "SET_FIELD",
          field: "nnDescription",
          value: log.nnDetails.description,
        });
        dispatch({
          type: "SET_FIELD",
          field: "nnClientName",
          value: log.nnDetails.clientName,
        });
        dispatch({
          type: "SET_FIELD",
          field: "nnSource",
          value: log.nnDetails.source,
        });
        dispatch({
          type: "SET_FIELD",
          field: "nnOppFrom",
          value: log.nnDetails.oppFrom,
        });
      }

      dispatch({
        type: "SET_FIELD",
        field: "expectedStart",
        value: log.timeline?.expectedStart?.split("T")[0],
      });

      dispatch({
        type: "SET_FIELD",
        field: "expectedEnd",
        value: log.timeline?.expectedEnd?.split("T")[0],
      });
    };

    fetchLog();
  }, [isEditMode, id]);

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

    let result;

    if (isEditMode && id) {
      result = await updateLogById(id, payload);
      showMessage("Log updated successfully");
    } else {
      result = await thunkDispatch(createUserLog(payload));
      showMessage("Log created successfully");
    }

    if (result?.success) {
      const routeRole = getRouteRole(user?.role);
      navigate(`/${routeRole}/dashboard`);
    }
  };

  const canAddMoreRows = () =>
    state.techRows.length < state.selectedTechnologies.length;
  const handleGenerateSummary = async () => {
    if (!state.detailedNotes.trim()) {
      showMessage("Please enter detailed notes first");
      return;
    }

    try {
      setGeneratingSummary(true);

      const { summary } = await generateSummaryFromNotes(state.detailedNotes);

      dispatch({
        type: "SET_FIELD",
        field: "shortDescription",
        value: summary,
      });
    } catch (error) {
      console.log(error);
      showMessage("Failed to generate summary");
    } finally {
      setGeneratingSummary(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 6, // more spacing around the page
        background: "#F2F2F2", // lighter landscape
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
        {/* <Typography variant="h5" fontWeight="bold" mb={3} color="#48206F">
          Log Form
        </Typography> */}
        <Typography variant="h5" fontWeight="bold" mb={3} color="#48206F">
          {isEditMode ? "Edit Log" : "Create Log"}
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
            <Typography mt={4} fontWeight={"bold"} variant="h6">
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
            <Typography mt={4} fontWeight={"bold"} variant="h6">
              Opportunity Source
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid size={3}>
                {state.requirementType === "EE" ? (
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Project Name"
                    value={state.projectName}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "projectName",
                        value: e.target.value,
                      })
                    }
                  >
                    {PROJECT_OPTIONS.map((project) => (
                      <MenuItem key={project} value={project}>
                        {project}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    label="Project Name"
                    value={state.projectName}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "projectName",
                        value: e.target.value,
                      })
                    }
                  />
                )}
              </Grid>

              {[
                // ["Project Name", "projectName"],
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
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
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

              {state.peoplePresent.map((p: { name: string }, i: number) => (
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
            {state.techRows.map(
              (row: { technology: string; count: number }, index: number) => (
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
                          (tech: string) =>
                            tech === row.technology ||
                            !state.techRows.some(
                              (r: { technology: string; count: number }) =>
                                r.technology === tech
                            )
                        )
                        .map((tech: string) => (
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
                      sx={{ outline: "none" }}
                      onClick={() =>
                        dispatch({ type: "REMOVE_TECH_ROW", index })
                      }
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )
            )}
            {/* Detailed Notes */}
            <Grid container mt={3}>
              <TextField
                fullWidth
                label="Detailed Notes"
                multiline
                minRows={3}
                maxRows={6}
                size="medium"
                value={state.detailedNotes}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "detailedNotes",
                    value: e.target.value,
                  })
                }
                sx={{
                  // Target the textarea
                  "& textarea": {
                    scrollbarWidth: "thin", // Firefox
                    scrollbarColor: "#7B1FA2 transparent",

                    // Chrome, Edge, Safari
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#7B1FA2",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#6A1B9A",
                    },

                    // Remove scrollbar arrows
                    "&::-webkit-scrollbar-button": {
                      display: "none",
                    },
                  },
                }}
              />
            </Grid>
            {/* Short Description */}
            <Grid container mt={3} display={"flex"} gap={2}>
              {/* <Grid minWidth={480}> */}
              <TextField
                fullWidth
                label="Short Description"
                multiline
                minRows={3}
                maxRows={6}
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
              {/* </Grid> */}
              {/* <Button
                variant="contained"
                color="primary"
                startIcon={<AutoAwesomeIcon fontSize="small" />}
                onClick={handleGenerateSummary}
                // disabled={generatingSummary || !state.detailedNotes}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                }}
              >
                {generatingSummary ? "Generating..." : "Generate"}
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                startIcon={
                  <AutoAwesomeIcon
                    fontSize="small"
                    sx={{
                      animation: generatingSummary
                        ? "zoomPulse 1s ease-in-out infinite"
                        : "none",
                    }}
                  />
                }
                onClick={handleGenerateSummary}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  ...zoomAnimation,
                }}
              >
                {generatingSummary ? "Generating..." : "Generate"}
              </Button>
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
            <DatePicker
              label="Expected Start Date"
              value={state.expectedStart ? dayjs(state.expectedStart) : null}
              minDate={dayjs()} // today
              onChange={(newValue: Dayjs | null) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "expectedStart",
                  value: newValue ? newValue.format("YYYY-MM-DD") : "",
                });

                // Optional: auto-fix end date
                if (
                  state.expectedEnd &&
                  newValue &&
                  dayjs(state.expectedEnd).isBefore(newValue)
                ) {
                  dispatch({
                    type: "SET_FIELD",
                    field: "expectedEnd",
                    value: newValue.format("YYYY-MM-DD"),
                  });
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </Grid>

          <Grid minWidth={230}>
            <DatePicker
              label="Expected End Date"
              value={state.expectedEnd ? dayjs(state.expectedEnd) : null}
              minDate={
                state.expectedStart ? dayjs(state.expectedStart) : dayjs()
              }
              onChange={(newValue: Dayjs | null) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "expectedEnd",
                  value: newValue ? newValue.format("YYYY-MM-DD") : "",
                });
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error:
                    Boolean(state.expectedStart && state.expectedEnd) &&
                    dayjs(state.expectedEnd).isBefore(
                      dayjs(state.expectedStart)
                    ),
                  helperText:
                    state.expectedStart &&
                    state.expectedEnd &&
                    dayjs(state.expectedEnd).isBefore(
                      dayjs(state.expectedStart)
                    )
                      ? "End date cannot be before start date"
                      : "",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Submit */}
        <Box textAlign="center" mt={4}>
          {/* <Button
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
          </Button> */}
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
            {isEditMode ? "Update" : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LOGForm;
