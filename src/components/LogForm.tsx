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

// ----------------------------- TYPES -----------------------------
type People = { name: string };

type TechRow = {
  technology: string;
  count: string;
  expertise: string;
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
  totalPersons: string;
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
  requirementType: "",

  projectName: "",
  clientName: "",
  projectCode: "",
  urgency: "",
  meetingType: "",
  callDate: "",
  screenshot: null,
  peoplePresent: [{ name: "" }],

  selectedTechnologies: [],
  totalPersons: "",
  techRows: [],

  oppCategory: "",
  shortDescription: "",
  detailedNotes: "",

  expectedStart: "",
  expectedEnd: "",

  nnDescription: "",
  nnClientName: "",
  nnSource: "",
  nnOppFrom: "",
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
  | { type: "UPDATE_TECH_ROW"; index: number; field: keyof TechRow; value: string }
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

    case "SET_TECHNOLOGIES":
      return {
        ...state,
        selectedTechnologies: action.value,
      };

    case "RESET_TECH_ROWS":
      return { ...state, techRows: [] };

    case "ADD_TECH_ROW":
      return {
        ...state,
        techRows: [...state.techRows, { technology: "", count: "", expertise: "" }],
      };

    case "REMOVE_TECH_ROW":
      return {
        ...state,
        techRows: state.techRows.filter((_, i) => i !== action.index),
      };

    case "UPDATE_TECH_ROW":
      return {
        ...state,
        techRows: state.techRows.map((row, i) =>
          i === action.index ? { ...row, [action.field]: action.value } : row
        ),
      };

    default:
      return state;
  }
}

// ----------------------------- COMPONENT -----------------------------
const LOGForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

    dispatch({ type: "SET_FIELD", field: "employeeId", value: user.employeeId });
    dispatch({ type: "SET_FIELD", field: "employeeName", value: user.employeeName });
    dispatch({ type: "SET_FIELD", field: "employeeEmail", value: user.employeeEmail });
    dispatch({ type: "SET_FIELD", field: "department", value: user.department });
    dispatch({ type: "SET_FIELD", field: "team", value: user.team });
    dispatch({ type: "SET_FIELD", field: "manager", value: user.manager });
  }, []);

  // ---------------------- AUTO CREATE TECH ROWS WHEN TECH SELECTED ----------------------
  useEffect(() => {
    dispatch({ type: "RESET_TECH_ROWS" });
    state.selectedTechnologies.forEach(() => {
      dispatch({ type: "ADD_TECH_ROW" });
    });
  }, [state.selectedTechnologies]);

  // ---------------------- SUBMIT ----------------------
  const handleSubmit = () => {
    console.log("FINAL FORM:", state);
    alert("Form Submitted!");
  };

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
        {(state.requirementType === "EE" ||
          state.requirementType === "EN") && (
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
                    dispatch({ type: "SET_FIELD", field: "projectName", value: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={state.clientName}
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "clientName", value: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Project Code"
                  value={state.projectCode}
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "projectCode", value: e.target.value })
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
                    dispatch({ type: "SET_FIELD", field: "urgency", value: e.target.value })
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
                    dispatch({ type: "SET_FIELD", field: "callDate", value: e.target.value })
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
                        onClick={() => dispatch({ type: "REMOVE_PEOPLE", index: i })}
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
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {["React", "Angular", "Python", "Java", "Node"].map((tech) => (
                      <MenuItem key={tech} value={tech}>
                        {tech}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Total Persons"
                  type="number"
                  value={state.totalPersons}
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "totalPersons", value: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            {/* Dynamic Tech Rows */}
            {state.techRows.map((row, i) => (
              <Grid
                container
                spacing={2}
                alignItems="center"
                key={i}
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
                        index: i,
                        field: "technology",
                        value: e.target.value,
                      })
                    }
                  >
                    {state.selectedTechnologies.map((tech) => (
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
                        index: i,
                        field: "count",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Expertise"
                    value={row.expertise}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_TECH_ROW",
                        index: i,
                        field: "expertise",
                        value: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item>
                  <IconButton
                    color="error"
                    onClick={() => dispatch({ type: "REMOVE_TECH_ROW", index: i })}
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
          Expected Timeline & Billing
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




// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
//   Select,
//   InputLabel,
//   FormControl,
//   FormHelperText,
//   Chip,
//   OutlinedInput,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import UploadFileIcon from "@mui/icons-material/UploadFile";

// type RequirementType = "EE" | "EN" | "NN";
// type Urgency = "Immediate" | "High" | "Normal";
// type MeetingType =
//   | "catch up call"
//   | "review meeting"
//   | "client meeting"
//   | "one to one"
//   | "presentation"
//   | "others";

// type TechOption = string;

// type PersonPresent = {
//   name: string;
//   role?: string;
// };

// type TechRow = {
//   tech: string; // tech name
//   count: number;
//   expertise: string;
// };

// export type LogFormPayload = {
//   // section 1
//   employeeId?: string;
//   employeeName?: string;
//   employeeEmail?: string;
//   department?: string;
//   team?: string;
//   reportingManagerId?: string | null;

//   // req type
//   requirementType: RequirementType;

//   // section 2 (Opp From)
//   projectName?: string;
//   clientName?: string;
//   projectCode?: string;
//   urgency?: Urgency;
//   meetingType?: MeetingType | string;
//   meetingDate?: string | null; // ISO date
//   meetingScreenshot?: File | null;
//   peoplePresent?: PersonPresent[];

//   // section 3 (Opp To)
//   technologies?: TechOption[]; // multi-select
//   totalPersons?: number;
//   techRows?: TechRow[]; // dynamic rows
//   oppCategory?: string;
//   shortDescription?: string;
//   detailedNotes?: string;

//   // section 4
//   expectedStartDate?: string | null;
//   expectedEndDate?: string | null;

//   // metadata
//   createdAt?: string;
// };

// interface EmployeeSummary {
//   employeeId?: string;
//   employeeName?: string;
//   employeeEmail?: string;
//   department?: string;
//   team?: string;
//   reportingManagerId?: string;
// }

// interface Props {
//   initialEmployee?: EmployeeSummary | null; // optional prefill
//   techOptions?: TechOption[]; // available tech list
//   onSubmit?: (payload: LogFormPayload) => Promise<void> | void;
//   submitLabel?: string;
// }

// const PRIMARY = "#8347AD";

// const defaultTechOptions = [
//   "React",
//   "Angular",
//   "Vue",
//   "Node.js",
//   "Python",
//   "Java",
//   "Golang",
// ];

// const sxField = { width: "100%" };

// const LogForm: React.FC<Props> = ({
//   initialEmployee = null,
//   techOptions = defaultTechOptions,
//   onSubmit,
//   submitLabel = "Submit",
// }) => {
//   // === form state ===
//   const [employeeId, setEmployeeId] = useState(initialEmployee?.employeeId || "");
//   const [employeeName, setEmployeeName] = useState(initialEmployee?.employeeName || "");
//   const [employeeEmail, setEmployeeEmail] = useState(initialEmployee?.employeeEmail || "");
//   const [department, setDepartment] = useState(initialEmployee?.department || "");
//   const [team, setTeam] = useState(initialEmployee?.team || "");
//   const [reportingManagerId, setReportingManagerId] = useState<string | null>(
//     initialEmployee?.reportingManagerId || null
//   );

//   const [requirementType, setRequirementType] = useState<RequirementType>("EE");

//   // Section 2
//   const [projectName, setProjectName] = useState("");
//   const [clientName, setClientName] = useState("");
//   const [projectCode, setProjectCode] = useState("");
//   const [urgency, setUrgency] = useState<Urgency>("Normal");
//   const [meetingType, setMeetingType] = useState<MeetingType | string>("catch up call");
//   const [meetingDate, setMeetingDate] = useState<string | null>(null);
//   const [meetingScreenshot, setMeetingScreenshot] = useState<File | null>(null);
//   const [peoplePresent, setPeoplePresent] = useState<PersonPresent[]>([
//     { name: "", role: "" },
//   ]);

//   // Section 3
//   const [technologies, setTechnologies] = useState<string[]>([]);
//   const [totalPersons, setTotalPersons] = useState<number | "">("");
//   const [techRows, setTechRows] = useState<TechRow[]>([
//     { tech: "", count: 1, expertise: "" },
//   ]);
//   const [oppCategory, setOppCategory] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [detailedNotes, setDetailedNotes] = useState("");

//   // Section 4
//   const [expectedStartDate, setExpectedStartDate] = useState<string | null>(null);
//   const [expectedEndDate, setExpectedEndDate] = useState<string | null>(null);

//   // UI / validation
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);

//   // Derived
//   const showOppSections = requirementType === "EE" || requirementType === "EN";
//   const showNNOnly = requirementType === "NN";

//   // Ensure techRows length >= technologies length when user picks new techs
//   useEffect(() => {
//     // if user added new techs, ensure at least one techRow per selected tech
//     if (technologies.length > 0) {
//       setTechRows((prev) => {
//         // keep existing rows for selected techs, add new ones for newly selected
//         const existingByTech = prev.reduce<Record<string, TechRow>>((acc, r) => {
//           if (r.tech) acc[r.tech] = r;
//           return acc;
//         }, {});
//         const result: TechRow[] = [];
//         for (const t of technologies) {
//           if (existingByTech[t]) result.push(existingByTech[t]);
//           else result.push({ tech: t, count: 1, expertise: "" });
//         }
//         return result;
//       });
//     } else {
//       // when no tech selected, keep at least one blank row
//       setTechRows([{ tech: "", count: 1, expertise: "" }]);
//     }
//   }, [technologies]);

//   // Helpers for dynamic arrays
//   const addPerson = () =>
//     setPeoplePresent((p) => [...p, { name: "", role: "" }]);
//   const removePerson = (i: number) =>
//     setPeoplePresent((p) => p.filter((_, idx) => idx !== i));
//   const updatePerson = (i: number, key: keyof PersonPresent, value: string) =>
//     setPeoplePresent((p) => {
//       const copy = [...p];
//       copy[i] = { ...copy[i], [key]: value };
//       return copy;
//     });

//   const addTechRow = () =>
//     setTechRows((t) => [...t, { tech: "", count: 1, expertise: "" }]);
//   const removeTechRow = (i: number) =>
//     setTechRows((t) => t.filter((_, idx) => idx !== i));
//   const updateTechRow = (i: number, key: keyof TechRow, value: any) =>
//     setTechRows((t) => {
//       const copy = [...t];
//       copy[i] = { ...copy[i], [key]: value };
//       return copy;
//     });

//   // Validation
//   const validate = (): boolean => {
//     const e: Record<string, string> = {};

//     // Section 1 minimal
//     if (!employeeName.trim()) e.employeeName = "Employee name is required";
//     if (!employeeEmail.trim()) e.employeeEmail = "Employee email is required";
//     // requirement type always present

//     if (showOppSections) {
//       // Section 2 validations for EE/EN
//       if (!projectName.trim()) e.projectName = "Project name is required";
//       if (!clientName.trim()) e.clientName = "Client name is required";
//       if (!meetingDate) e.meetingDate = "Meeting date is required";
//       // Section 3
//       if (!Array.isArray(technologies) || technologies.length === 0) {
//         e.technologies = "Select at least one technology";
//       }

//       const total = Number(totalPersons || 0);
//       if (!total || total <= 0) {
//         e.totalPersons = "Enter total number of persons required";
//       }

//       // techRows should cover selected techs and counts sum must be <= total
//       const rowsForSelected = techRows.filter((r) => r.tech && technologies.includes(r.tech));
//       const sum = rowsForSelected.reduce((acc, r) => acc + Number(r.count || 0), 0);
//       if (sum > total) {
//         e.techRows = `Sum of tech-specific counts (${sum}) cannot exceed total persons (${total})`;
//       }

//       // each selected tech must appear at least once in rows
//       for (const t of technologies) {
//         const found = techRows.some((r) => r.tech === t);
//         if (!found) {
//           e.techRows = `Please add at least one row for technology ${t}`;
//           break;
//         }
//       }
//     }

//     // NN minimal fields
//     if (showNNOnly) {
//       if (!shortDescription.trim()) e.shortDescription = "Short description is required for NN";
//       if (!clientName.trim()) e.clientName = "Client name is required";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Form normalization to payload
//   const buildPayload = (): LogFormPayload => {
//     return {
//       employeeId: employeeId || undefined,
//       employeeName: employeeName || undefined,
//       employeeEmail: employeeEmail || undefined,
//       department: department || undefined,
//       team: team || undefined,
//       reportingManagerId: reportingManagerId || null,

//       requirementType,

//       projectName: projectName || undefined,
//       clientName: clientName || undefined,
//       projectCode: projectCode || undefined,
//       urgency,
//       meetingType,
//       meetingDate: meetingDate || null,
//       meetingScreenshot: meetingScreenshot || null,
//       peoplePresent: peoplePresent.filter((p) => p.name.trim() !== ""),

//       technologies: technologies.length ? technologies : undefined,
//       totalPersons: typeof totalPersons === "number" ? totalPersons : undefined,
//       techRows: techRows.filter((r) => r.tech),
//       oppCategory: oppCategory || undefined,
//       shortDescription: shortDescription || undefined,
//       detailedNotes: detailedNotes || undefined,

//       expectedStartDate: expectedStartDate || null,
//       expectedEndDate: expectedEndDate || null,
//       createdAt: new Date().toISOString(),
//     };
//   };

//   // Submit handler
//   const handleSubmit = async () => {
//     if (!validate()) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }
//     setSubmitting(true);
//     const payload = buildPayload();
//     try {
//       if (onSubmit) await onSubmit(payload);
//       else {
//         // default demo behaviour
//         // eslint-disable-next-line no-alert
//         alert("Form ready to submit. Check console (payload).");
//         // eslint-disable-next-line no-console
//         console.log("LOG form payload:", payload);
//       }
//     } catch (err) {
//       // swallow, real handler shows messages
//       // eslint-disable-next-line no-console
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // file input handler
//   const handleFileChange = (f?: File | null) => {
//     setMeetingScreenshot(f || null);
//   };

//   // multi-select changes handled with MUI OutlinedInput + Chips
//   const handleTechToggle = (selected: readonly string[]) => {
//     setTechnologies(selected as string[]);
//   };

//   // layout / rendering
//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
//         <Typography variant="h4" mb={3} sx={{ color: PRIMARY }}>
//           LOG Form
//         </Typography>

//         {/* SECTION 1 */}
//         <Typography variant="h6" mb={1}>
//           Employee details
//         </Typography>
//         <Grid container spacing={2} mb={2}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Employee ID"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//               sx={sxField}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Employee Name"
//               value={employeeName}
//               onChange={(e) => setEmployeeName(e.target.value)}
//               sx={sxField}
//               size="small"
//               error={!!errors.employeeName}
//               helperText={errors.employeeName}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Employee Email"
//               value={employeeEmail}
//               onChange={(e) => setEmployeeEmail(e.target.value)}
//               sx={sxField}
//               size="small"
//               error={!!errors.employeeEmail}
//               helperText={errors.employeeEmail}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Department"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               sx={sxField}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Team"
//               value={team}
//               onChange={(e) => setTeam(e.target.value)}
//               sx={sxField}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               label="Reporting Manager (ID)"
//               value={reportingManagerId ?? ""}
//               onChange={(e) => setReportingManagerId(e.target.value || null)}
//               sx={sxField}
//               size="small"
//             />
//           </Grid>
//         </Grid>

//         {/* Requirement Type */}
//         <Grid container spacing={2} alignItems="center" mb={2}>
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth size="small">
//               <InputLabel id="req-type-label">Requirement Type</InputLabel>
//               <Select
//                 labelId="req-type-label"
//                 value={requirementType}
//                 label="Requirement Type"
//                 onChange={(e) => setRequirementType(e.target.value as RequirementType)}
//               >
//                 <MenuItem value="EE">EE</MenuItem>
//                 <MenuItem value="EN">EN</MenuItem>
//                 <MenuItem value="NN">NN</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         {/* Section 2 - Opp From (shows for EE/EN) */}
//         {showOppSections && (
//           <>
//             <Typography variant="h6" mt={2} mb={1}>
//               Opp. From (Section 2)
//             </Typography>

//             <Grid container spacing={2} mb={1}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Project Name"
//                   value={projectName}
//                   onChange={(e) => setProjectName(e.target.value)}
//                   size="small"
//                   fullWidth
//                   error={!!errors.projectName}
//                   helperText={errors.projectName}
//                 />
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Client Name"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   size="small"
//                   fullWidth
//                   error={!!errors.clientName}
//                   helperText={errors.clientName}
//                 />
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Project Code"
//                   value={projectCode}
//                   onChange={(e) => setProjectCode(e.target.value)}
//                   size="small"
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <FormControl size="small" fullWidth>
//                   <InputLabel id="urgency-label">Urgency</InputLabel>
//                   <Select
//                     labelId="urgency-label"
//                     value={urgency}
//                     label="Urgency"
//                     onChange={(e) => setUrgency(e.target.value as Urgency)}
//                   >
//                     <MenuItem value="Immediate">Immediate</MenuItem>
//                     <MenuItem value="High">High</MenuItem>
//                     <MenuItem value="Normal">Normal</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <FormControl size="small" fullWidth>
//                   <InputLabel id="meeting-type-label">Meeting Type</InputLabel>
//                   <Select
//                     labelId="meeting-type-label"
//                     value={meetingType}
//                     label="Meeting Type"
//                     onChange={(e) => setMeetingType(e.target.value as MeetingType)}
//                   >
//                     <MenuItem value="catch up call">Catch up call</MenuItem>
//                     <MenuItem value="review meeting">Review meeting</MenuItem>
//                     <MenuItem value="client meeting">Client meeting</MenuItem>
//                     <MenuItem value="one to one">One to one</MenuItem>
//                     <MenuItem value="presentation">Presentation</MenuItem>
//                     <MenuItem value="others">Others</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Date of discussion / call"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={meetingDate || ""}
//                   onChange={(e) => setMeetingDate(e.target.value)}
//                   size="small"
//                   fullWidth
//                   error={!!errors.meetingDate}
//                   helperText={errors.meetingDate}
//                 />
//               </Grid>

//               <Grid item xs={12} md={12}>
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     startIcon={<UploadFileIcon />}
//                     sx={{ borderColor: PRIMARY, color: PRIMARY }}
//                   >
//                     Upload Meeting Screenshot
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
//                     />
//                   </Button>
//                   {meetingScreenshot && <Typography>{meetingScreenshot.name}</Typography>}
//                 </Box>
//               </Grid>

//               {/* People present - dynamic */}
//               <Grid item xs={12} md={12}>
//                 <Typography variant="subtitle1" mb={1}>
//                   People present in the meeting
//                 </Typography>

//                 {peoplePresent.map((p, idx) => (
//                   <Grid container spacing={1} key={idx} alignItems="center" sx={{ mb: 1 }}>
//                     <Grid item xs={12} md={5}>
//                       <TextField
//                         label="Name"
//                         value={p.name}
//                         onChange={(e) => updatePerson(idx, "name", e.target.value)}
//                         size="small"
//                         fullWidth
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={5}>
//                       <TextField
//                         label="Role"
//                         value={p.role}
//                         onChange={(e) => updatePerson(idx, "role", e.target.value)}
//                         size="small"
//                         fullWidth
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={2}>
//                       <Box display="flex" gap={1}>
//                         <IconButton color="primary" onClick={() => addPerson()}>
//                           <AddCircleOutlineIcon />
//                         </IconButton>
//                         {peoplePresent.length > 1 && (
//                           <IconButton color="error" onClick={() => removePerson(idx)}>
//                             <RemoveCircleOutlineIcon />
//                           </IconButton>
//                         )}
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//           </>
//         )}

//         {/* NN only short fields */}
//         {showNNOnly && (
//           <>
//             <Typography variant="h6" mt={2} mb={1}>
//               Quick NN Fields
//             </Typography>
//             <Grid container spacing={2} mb={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Description"
//                   value={shortDescription}
//                   onChange={(e) => setShortDescription(e.target.value)}
//                   fullWidth
//                   size="small"
//                   error={!!errors.shortDescription}
//                   helperText={errors.shortDescription}
//                 />
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Client Name"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   fullWidth
//                   size="small"
//                   error={!!errors.clientName}
//                   helperText={errors.clientName}
//                 />
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Source"
//                   value={projectCode}
//                   onChange={(e) => setProjectCode(e.target.value)}
//                   fullWidth
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12} md={12}>
//                 <TextField
//                   label="Opportunity From"
//                   placeholder="Where opportunity came from"
//                   value={detailedNotes}
//                   onChange={(e) => setDetailedNotes(e.target.value)}
//                   fullWidth
//                   size="small"
//                 />
//               </Grid>
//             </Grid>
//           </>
//         )}

//         {/* Section 3 - Opp To (show for EE/EN) */}
//         {showOppSections && (
//           <>
//             <Typography variant="h6" mt={2} mb={1}>
//               Opp. To (Section 3)
//             </Typography>

//             <Grid container spacing={2} mb={2}>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth size="small" error={!!errors.technologies}>
//                   <InputLabel id="techs-label">Technologies Required</InputLabel>
//                   <Select
//                     labelId="techs-label"
//                     multiple
//                     value={technologies}
//                     onChange={(e) =>
//                       handleTechToggle(
//                         // MUI returns strings | readonly string[], cast safely
//                         typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
//                       )
//                     }
//                     input={<OutlinedInput label="Technologies Required" />}
//                     renderValue={(selected) => (
//                       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                         {(selected as string[]).map((v) => (
//                           <Chip key={v} label={v} size="small" sx={{ backgroundColor: "#eee" }} />
//                         ))}
//                       </Box>
//                     )}
//                   >
//                     {techOptions.map((t) => (
//                       <MenuItem key={t} value={t}>
//                         {t}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <FormHelperText>{errors.technologies}</FormHelperText>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Total number of persons"
//                   type="number"
//                   fullWidth
//                   size="small"
//                   value={totalPersons}
//                   onChange={(e) => setTotalPersons(Number(e.target.value || 0))}
//                   error={!!errors.totalPersons}
//                   helperText={errors.totalPersons}
//                 />
//               </Grid>

//               <Grid item xs={12} md={3}>
//                 <TextField
//                   label="Opportunity Category"
//                   fullWidth
//                   size="small"
//                   value={oppCategory}
//                   onChange={(e) => setOppCategory(e.target.value)}
//                 />
//               </Grid>

//               {/* dynamic tech rows */}
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" mb={1}>
//                   Technology breakdown
//                 </Typography>
//                 {techRows.map((r, idx) => (
//                   <Grid container spacing={1} key={idx} alignItems="center" sx={{ mb: 1 }}>
//                     <Grid item xs={12} md={4}>
//                       <FormControl fullWidth size="small">
//                         <InputLabel id={`tech-select-${idx}`}>Technology</InputLabel>
//                         <Select
//                           labelId={`tech-select-${idx}`}
//                           value={r.tech}
//                           label="Technology"
//                           onChange={(e) => updateTechRow(idx, "tech", e.target.value)}
//                         >
//                           {/* allow any selected techs first, then all options */}
//                           {technologies.map((t) => (
//                             <MenuItem key={t} value={t}>
//                               {t}
//                             </MenuItem>
//                           ))}
//                           {techOptions
//                             .filter((t) => !technologies.includes(t))
//                             .map((t) => (
//                               <MenuItem key={t} value={t}>
//                                 {t}
//                               </MenuItem>
//                             ))}
//                         </Select>
//                       </FormControl>
//                     </Grid>

//                     <Grid item xs={12} md={3}>
//                       <TextField
//                         label="Count"
//                         type="number"
//                         fullWidth
//                         size="small"
//                         value={r.count}
//                         onChange={(e) => updateTechRow(idx, "count", Number(e.target.value || 0))}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         label="Expertise level"
//                         fullWidth
//                         size="small"
//                         value={r.expertise}
//                         onChange={(e) => updateTechRow(idx, "expertise", e.target.value)}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={1}>
//                       <Box display="flex" gap={1}>
//                         <IconButton color="primary" onClick={addTechRow}>
//                           <AddCircleOutlineIcon />
//                         </IconButton>
//                         {techRows.length > 1 && (
//                           <IconButton color="error" onClick={() => removeTechRow(idx)}>
//                             <RemoveCircleOutlineIcon />
//                           </IconButton>
//                         )}
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 ))}
//                 {errors.techRows && (
//                   <Typography color="error" variant="body2">
//                     {errors.techRows}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="Short description"
//                   fullWidth
//                   value={shortDescription}
//                   onChange={(e) => setShortDescription(e.target.value)}
//                   size="small"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="Detailed notes"
//                   fullWidth
//                   value={detailedNotes}
//                   onChange={(e) => setDetailedNotes(e.target.value)}
//                   size="small"
//                   multiline
//                   minRows={3}
//                 />
//               </Grid>
//             </Grid>
//           </>
//         )}

//         {/* Section 4 Timeline & Billing */}
//         <Typography variant="h6" mt={2} mb={1}>
//           Expected timeline and Billing (Section 4)
//         </Typography>

//         <Grid container spacing={2} mb={2}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Expected start date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               size="small"
//               value={expectedStartDate || ""}
//               onChange={(e) => setExpectedStartDate(e.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Expected end date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               size="small"
//               value={expectedEndDate || ""}
//               onChange={(e) => setExpectedEndDate(e.target.value)}
//             />
//           </Grid>
//         </Grid>

//         {/* Submit */}
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={submitting}
//             sx={{
//               backgroundColor: PRIMARY,
//               "&:hover": { backgroundColor: "#6b2f92" },
//               px: 4,
//               py: 1.2,
//             }}
//           >
//             {submitLabel}
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default LogForm;
