import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessUnits } from "../store/actions/adminActions";
import {
  getCurrentEmployee,
  getManagersList,
  upsertEmployee,
} from "../store/actions/employeeActions";
import type { RootState } from "../store";

import "./EmployeeFormPage.css"; // <-- external CSS

type Skill = {
  skillName: string;
  proficiencyLevel: string;
  experience: string;
};

const EmployeeFormPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const currentUser = useSelector(
    (state: any) => state.employee.currentUserDetails
  );
  const { businessUnits } = useSelector((state: RootState) => state.admin);
  const { managers } = useSelector((state: RootState) => state.employee);
  const [form, setForm] = useState({
    employeeId: "",
    employeeName: "",
    employeeEmail: user?.email || "",
    contactNumber: "",
    dob: "",
    workLocation: "",
    employmentType: "",
    role: "EMP",
    department: "",
    team: "",
    managerId: "",
    businessUnitId: "",
    totalExperience: "",
    previousProjects: "",
    previousCompanies: "",
    currentProjects: "",
    skills: [{ skillName: "", proficiencyLevel: "", experience: "" }],
  });
  console.log("form", form.managerId);

  useEffect(() => {
    dispatch(getCurrentEmployee() as any);
    dispatch(getBusinessUnits() as any);
    dispatch(getManagersList() as any);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setForm({
        employeeId: currentUser.employeeId || "",
        employeeName: currentUser.employeeName || "",
        employeeEmail: user?.email || "",
        contactNumber: currentUser.contactNumber || "",
        dob: currentUser.dob?.substring(0, 10) || "",
        workLocation: currentUser.workLocation || "",
        employmentType: currentUser.employmentType || "",
        role: currentUser.role || "",
        department: currentUser.department || "",
        team: currentUser.team || "",
        managerId: currentUser.managerId?._id || "",
        businessUnitId: currentUser.businessUnitId?._id || "",
        totalExperience: currentUser.totalExperience?.toString() || "",
        previousProjects: currentUser.previousProjects?.join(", ") || "",
        previousCompanies: currentUser.previousCompanies?.join(", ") || "",
        currentProjects: currentUser.currentProjects?.join(", ") || "",
        skills:
          currentUser.skills?.length > 0
            ? currentUser.skills.map((s: any) => ({
                skillName: s.skillName || "",
                proficiencyLevel: s.proficiencyLevel || "",
                experience: s.experience?.toString() || "",
              }))
            : [{ skillName: "", proficiencyLevel: "", experience: "" }],
      });
    }
  }, [currentUser]);

  const handleChange = (e: any) => {
    console.log("name, value", e.target.value, e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (
    index: number,
    key: keyof Skill,
    value: string
  ) => {
    const updated = [...form.skills];
    updated[index][key] = value;
    setForm({ ...form, skills: updated });
  };

  const addSkill = () => {
    setForm({
      ...form,
      skills: [
        ...form.skills,
        { skillName: "", proficiencyLevel: "", experience: "" },
      ],
    });
  };

  const removeSkill = (index: number) => {
    const updated = [...form.skills];
    updated.splice(index, 1);
    setForm({ ...form, skills: updated });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      totalExperience: Number(form.totalExperience || 0),
      previousProjects: form.previousProjects.split(",").map((x) => x.trim()),
      previousCompanies: form.previousCompanies.split(",").map((x) => x.trim()),
      currentProjects: form.currentProjects.split(",").map((x) => x.trim()),
      skills: form.skills.map((s) => ({
        ...s,
        experience: Number(s.experience || 0),
      })),
    };

    const res = await dispatch(upsertEmployee(payload) as any);
    alert(res.success ? "Employee saved successfully!" : "Error: " + res.data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F2F2F2",
        padding: "120px 24px 40px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          width: "85%",
          margin: "auto",
          borderRadius: 3,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} color="#48206F">
          Employee Details Form
        </Typography>

        {/* BASIC DETAILS */}
        <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: "bold" }}>
          Basic Details
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <TextField
              // className="mui-field"
              label="Employee ID"
              name="employeeId"
              fullWidth
              required
              size="small"
              value={form.employeeId}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Employee Name"
              name="employeeName"
              fullWidth
              required
              value={form.employeeName}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Employee Email"
              fullWidth
              name="employeeEmail"
              disabled
              value={form.employeeEmail}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Contact Number"
              name="contactNumber"
              fullWidth
              value={form.contactNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              type="date"
              label="Date of Birth"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Work Location"
              name="workLocation"
              fullWidth
              value={form.workLocation}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* EMPLOYMENT INFO */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          Employment Information
        </Typography>

        <Grid container spacing={2}>
          <Grid minWidth={180}>
            <FormControl fullWidth size="small" >
              <InputLabel>Employment Type</InputLabel>
              <Select
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
              >
                <MenuItem className="mui-menu-item" value="Full Time">
                  Full Time
                </MenuItem>
                <MenuItem className="mui-menu-item" value="Part Time">
                  Part Time
                </MenuItem>
                <MenuItem className="mui-menu-item" value="Contract">
                  Contract
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid >
            <TextField
              // className="mui-field"
              size="small"
              label="Role"
              name="role"
              fullWidth
              value={form.role}
              onChange={handleChange}
            />
          </Grid>

          <Grid >
            <TextField
              // className="mui-field"
              size="small"
              label="Department"
              name="department"
              fullWidth
              value={form.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid >
            <TextField
              // className="mui-field"
              size="small"
              label="Team"
              name="team"
              fullWidth
              value={form.team}
              onChange={handleChange}
            />
          </Grid>

          <Grid  minWidth={180}>
            {/* <FormControl fullWidth className="mui-field">
              <InputLabel>Reporting Manager</InputLabel>
              <Select native name="managerId" value={form.managerId} onChange={handleChange}>
                {managers.length === 0 ? (
                  <option disabled>No Managers Found</option>
                ) : (
                  managers.map((m: any) => (
                    <option key={m._id} value={m._id}>
                      {`${m.employeeName} (${m.employeeId})`}
                    </option>
                  ))
                )}
              </Select>
            </FormControl> */}
            <FormControl fullWidth size="small">
              <InputLabel>Reporting Manager</InputLabel>

              <Select
                native
                name="managerId"
                value={form.managerId ?? ""} // stays empty initially
                onChange={handleChange}
              >
                {/* Hidden placeholder – not selectable */}
                <option value="" disabled hidden></option>

                {managers.length === 0 ? (
                  <option disabled>No Managers Found</option>
                ) : (
                  managers.map((m: any) => (
                    <option key={m._id} value={m._id}>
                      {`${m.employeeName} (${m.employeeId})`}
                    </option>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid  minWidth={180}>
            <FormControl fullWidth size="small">
              <InputLabel>Business Unit</InputLabel>
              <Select
                native
                name="businessUnitId"
                value={form.businessUnitId}
                onChange={handleChange}
              >
                {businessUnits.length === 0 ? (
                  <option disabled>No Business Units Found</option>
                ) : (
                  businessUnits.map((bu: any) => (
                    <option key={bu._id} value={bu._id}>
                      {bu.name}
                    </option>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* EXPERIENCE */}
        <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
          Experience
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Total Experience"
              name="totalExperience"
              fullWidth
              value={form.totalExperience}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Previous Projects"
              name="previousProjects"
              fullWidth
              value={form.previousProjects}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Previous Companies"
              name="previousCompanies"
              fullWidth
              value={form.previousCompanies}
              onChange={handleChange}
            />
          </Grid>

          <Grid>
            <TextField
              // className="mui-field"
              size="small"
              label="Current Projects"
              name="currentProjects"
              fullWidth
              value={form.currentProjects}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* SKILLS */}
        <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
          Skills
        </Typography>

        {form.skills.map((skill, index) => (
          <Grid container spacing={2} key={index} mb={1}>
            <Grid>
              <TextField
                // className="mui-field"
                size="small"
                label="Skill Name"
                fullWidth
                value={skill.skillName}
                onChange={(e) =>
                  handleSkillChange(index, "skillName", e.target.value)
                }
              />
            </Grid>

            <Grid >
              <TextField
                // className="mui-field"
                size="small"
                label="Proficiency Level"
                fullWidth
                value={skill.proficiencyLevel}
                onChange={(e) =>
                  handleSkillChange(index, "proficiencyLevel", e.target.value)
                }
              />
            </Grid>

            <Grid >
              <TextField
                // className="mui-field"
                size="small"
                label="Experience (Years)"
                type="number"
                fullWidth
                value={skill.experience}
                onChange={(e) =>
                  handleSkillChange(index, "experience", e.target.value)
                }
              />
            </Grid>

            <Grid  display="flex" alignItems="center">
              <IconButton
                className="remove-icon"
                onClick={() => removeSkill(index)}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          startIcon={<AddCircleIcon />}
          onClick={addSkill}
          className="add-skill-btn"
        >
          Add Skill
        </Button>

        {/* SUBMIT */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            // className="submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeFormPage;
