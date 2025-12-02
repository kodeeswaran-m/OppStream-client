import React, { useEffect, useReducer } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  MenuItem,
  Button,
  Grid,
  IconButton,
  Chip,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { createUserLog } from "../store/actions/employeeActions";
import { useDispatch } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "../store";
import type { AnyAction } from "redux";
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

// ----------------------------- TYPES -----------------------------
type People = { name: string };

type TechRow = {
  technology: string;
  count: number;
  // expertise: string;
};

type State = {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  team: string;
  manager: string;

  requirementType: "EE" | "EN" | "NN" | "";

  // SECTION 2
  projectName: string;
  clientName: string;
  projectCode: string;
  urgency: string;
  meetingType: string;
  callDate: string;
  screenshot: File | null;
  peoplePresent: People[];

  // SECTION 3
  selectedTechnologies: string[];
  totalPersons: number;
  techRows: TechRow[];
  oppCategory: string;
  shortDescription: string;
  detailedNotes: string;

  // Section 4
  expectedStart: string;
  expectedEnd: string;

  // Section NN
  nnDescription: string;
  nnClientName: string;
  nnSource: string;
  nnOppFrom: string;
};

// ----------------------------- INITIAL STATE -----------------------------
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

// ----------------------------- ACTION TYPES -----------------------------
type Action =
  | { type: "SET_FIELD"; field: keyof State; value: any }
  | { type: "ADD_PEOPLE" }
  | { type: "REMOVE_PEOPLE"; index: number }
  | { type: "UPDATE_PEOPLE"; index: number; value: string }
  | { type: "SET_TECHNOLOGIES"; value: string[] }
  | { type: "ADD_TECH_ROW" }
  | { type: "REMOVE_TECH_ROW"; index: number }
  | {
      type: "UPDATE_TECH_ROW";
      index: number;
      field: keyof TechRow;
      value: string;
    }
  | { type: "RESET_TECH_ROWS" };

// ----------------------------- REDUCER -----------------------------
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "ADD_PEOPLE":
      return {
        ...state,
        peoplePresent: [...state.peoplePresent, { name: "" }],
      };

    case "REMOVE_PEOPLE":
      return {
        ...state,
        peoplePresent: state.peoplePresent.filter((_, i) => i !== action.index),
      };

    case "UPDATE_PEOPLE":
      return {
        ...state,
        peoplePresent: state.peoplePresent.map((p, i) =>
          i === action.index ? { name: action.value } : p
        ),
      };

    // case "SET_TECHNOLOGIES":
    //   return {
    //     ...state,
    //     selectedTechnologies: action.value,
    //   };
    case "SET_TECHNOLOGIES":
      return {
        ...state,
        selectedTechnologies: action.value,
        techRows: state.techRows.filter((row) =>
          action.value.includes(row.technology)
        ), // remove tech-rows that belong to unselected techs
      };

    case "RESET_TECH_ROWS":
      return { ...state, techRows: [] };

    // case "ADD_TECH_ROW":
    //   return {
    //     ...state,
    //     techRows: [...state.techRows, { technology: "", count: "" }],
    //   };
    case "ADD_TECH_ROW":
      if (state.techRows.length >= state.selectedTechnologies.length) {
        return state; // block adding more rows
      }

      return {
        ...state,
        techRows: [...state.techRows, { technology: "", count: 0 }],
      };

    case "REMOVE_TECH_ROW":
      return {
        ...state,
        techRows: state.techRows.filter((_, i) => i !== action.index),
      };

    // case "UPDATE_TECH_ROW":
    //   return {
    //     ...state,
    //     techRows: state.techRows.map((row, i) =>
    //       i === action.index ? { ...row, [action.field]: action.value } : row
    //     ),
    //   };
    case "UPDATE_TECH_ROW":
      const updatedRows = state.techRows.map((row, i) =>
        i === action.index ? { ...row, [action.field]: action.value } : row
      );

      const total = updatedRows.reduce(
        (sum, r) => sum + Number(r.count || 0),
        0
      );

      return {
        ...state,
        techRows: updatedRows,
        totalPersons: total, // auto update
      };

    default:
      return state;
  }
}

// ----------------------------- COMPONENT -----------------------------
const LOGForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const thunkDispatch:AppDispatch=useDispatch();
  // ---------------------- Auto-fill from user profile ----------------------
  useEffect(() => {
    // Replace with your API call:
    const user = {
      employeeId: "EMP101",
      employeeName: "John Doe",
      employeeEmail: "john@company.com",
      department: "IT",
      team: "Frontend",
      manager: "Sam",
    };

    dispatch({
      type: "SET_FIELD",
      field: "employeeId",
      value: user.employeeId,
    });
    dispatch({
      type: "SET_FIELD",
      field: "employeeName",
      value: user.employeeName,
    });
    dispatch({
      type: "SET_FIELD",
      field: "employeeEmail",
      value: user.employeeEmail,
    });
    dispatch({
      type: "SET_FIELD",
      field: "department",
      value: user.department,
    });
    dispatch({ type: "SET_FIELD", field: "team", value: user.team });
    dispatch({ type: "SET_FIELD", field: "manager", value: user.manager });
  }, []);

  // ---------------------- SUBMIT ----------------------
  const handleSubmit = () => {
    const payload = {
      requirementType: state.requirementType,

      // Opp From section
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
              meetingScreenshot: state.screenshot, // upload to Cloudinary before sending
              peoplePresent: state.peoplePresent,
            },

      // Opp To section
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

      // When NN type — include NN section fields
      nnDetails:
        state.requirementType === "NN"
          ? {
              description: state.nnDescription,
              clientName: state.nnClientName,
              source: state.nnSource,
              oppFrom: state.nnOppFrom,
            }
          : undefined,

      // Timeline
      timeline: {
        expectedStart: state.expectedStart,
        expectedEnd: state.expectedEnd,
      },
    };

    thunkDispatch(createUserLog(payload))
      

    console.log("FINAL PAYLOAD →", payload);
  };

  const canAddMoreRows = () =>
    state.techRows.length < state.selectedTechnologies.length;

  return (
    <Box sx={{ minHeight: "100vh", p: 4, background: "#F6F4FA" }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          LOG Form
        </Typography>

        {/* ================= SECTION 1 ================= */}
        <Typography variant="h6" mb={2}>
          Employee Details
        </Typography>

        <Grid container spacing={2}>
          {[
            ["Employee ID", "employeeId"],
            ["Employee Name", "employeeName"],
            ["Employee Email", "employeeEmail"],
            ["Department", "department"],
            ["Team", "team"],
            ["Reporting Manager", "manager"],
          ].map(([label, field]) => (
            <Grid item xs={4} key={field}>
              <TextField
                fullWidth
                label={label}
                value={state[field as keyof State]}
                disabled
              />
            </Grid>
          ))}

          {/* Requirement Type */}
          <Grid item xs={4}>
            <TextField
              select
              label="Requirement Type"
              fullWidth
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

        {/* ================= NN SECTION ================= */}
        {state.requirementType === "NN" && (
          <>
            <Typography mt={4} variant="h6">
              NN Details
            </Typography>
            <Grid container spacing={2} mt={1}>
              {[
                ["Description", "nnDescription"],
                ["Client Name", "nnClientName"],
                ["Source", "nnSource"],
                ["Opp. From", "nnOppFrom"],
              ].map(([label, field]) => (
                <Grid item xs={6} key={field}>
                  <TextField
                    fullWidth
                    label={label}
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

        {/* ================= SECTION 2 (if EE or EN) ================= */}
        {(state.requirementType === "EE" || state.requirementType === "EN") && (
          <>
            <Typography mt={4} variant="h6">
              Opp. From
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
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
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={state.clientName}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "clientName",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Project Code"
                  value={state.projectCode}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "projectCode",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Urgency Level"
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

              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Meeting Type"
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

              <Grid item xs={4}>
                <TextField
                  type="date"
                  label="Date of Discussion"
                  fullWidth
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

              {/* People Present */}
              <Grid item xs={12} mt={2}>
                <Typography fontWeight="bold">People Present</Typography>

                {state.peoplePresent.map((p, i) => (
                  <Grid
                    container
                    spacing={1}
                    key={i}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label="Name"
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

                    <Grid item>
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
                  startIcon={<AddCircleIcon />}
                  onClick={() => dispatch({ type: "ADD_PEOPLE" })}
                >
                  Add Person
                </Button>
              </Grid>
            </Grid>

            {/* ================= SECTION 3 ================= */}
            <Typography mt={4} variant="h6">
              Opp. To
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <FormControl fullWidth>
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

              <Grid item xs={3}>
                <TextField
                  label="Total Persons"
                  value={state.totalPersons}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>

            {/* ADD ROW BUTTON */}
            <Box mt={2}>
              <Button
                variant="outlined"
                startIcon={<AddCircleIcon />}
                disabled={!canAddMoreRows()}
                onClick={() => dispatch({ type: "ADD_TECH_ROW" })}
              >
                Add Technology Row
              </Button>

              {/* {!canAddMoreRows() && (
                <Typography color="error" fontSize="14px" mt={1}>
                  Total count reached or no technologies selected.
                </Typography>
              )} */}
            </Box>

            {/* DYNAMIC TECH ROWS */}
            {state.techRows.map((row, index) => (
              <Grid
                container
                spacing={2}
                alignItems="center"
                key={index}
                sx={{ mt: 1 }}
              >
                <Grid item xs={4}>
                  <TextField
                    select
                    fullWidth
                    label="Technology"
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
                        (tech) =>
                          tech === row.technology || // allow already selected value
                          !state.techRows.some((r) => r.technology === tech) // hide tech used in another row
                      )
                      .map((tech) => (
                        <MenuItem key={tech} value={tech}>
                          {tech}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Count"
                    type="number"
                    value={row.count}
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

                <Grid item>
                  <IconButton
                    color="error"
                    onClick={() => dispatch({ type: "REMOVE_TECH_ROW", index })}
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            {/* Category + Notes */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Opp. Category"
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

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Short Description"
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

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Detailed Notes"
                  value={state.detailedNotes}
                  multiline
                  rows={2}
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

        {/* ================= SECTION 4 ================= */}
        <Typography mt={4} variant="h6">
          Expected Timeline
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={4}>
            <TextField
              type="date"
              fullWidth
              label="Expected Start Date"
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

          <Grid item xs={4}>
            <TextField
              type="date"
              fullWidth
              label="Expected End Date"
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
            sx={{ px: 4, py: 1.2, borderRadius: 3, background: "#7E57C2" }}
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
