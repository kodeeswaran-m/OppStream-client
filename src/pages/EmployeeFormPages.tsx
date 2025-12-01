import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Paper,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBusinessUnits } from "../store/actions/adminActions";
import type { RootState } from "../store";
import { getCurrentEmployee, getManagersList, upsertEmployee } from "../store/actions/employeeActions";

type Skill = {
  skillName: string;
  proficiencyLevel: string;
  experience: string;
};
const EmployeeFormPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
const currentUser = useSelector((state: any) => state.employee.currentUserDetails);

  // INITIAL FORM STATE
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

  // ---------------- FETCH CURRENT EMPLOYEE ON LOAD ----------------
  useEffect(() => {
    dispatch(getCurrentEmployee() as any);
  }, []);
console.log("current user", currentUser);
  // ---------------- UPDATE FORM WHEN EMPLOYEE DATA ARRIVES ----------------
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

      // ⭐ Extract correct _id
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


  useEffect(() => {
    dispatch(getBusinessUnits() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getManagersList() as any);
  }, [dispatch]);

  const { businessUnits } = useSelector((state: RootState) => state.admin);
  const { managers } = useSelector((state: RootState) => state.employee);

  const handleChange = (e: any) => {
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

      previousProjects: form.previousProjects
        ? form.previousProjects.split(",").map((x) => x.trim())
        : [],

      previousCompanies: form.previousCompanies
        ? form.previousCompanies.split(",").map((x) => x.trim())
        : [],

      currentProjects: form.currentProjects
        ? form.currentProjects.split(",").map((x) => x.trim())
        : [],

      skills: form.skills.map((s) => ({
        ...s,
        experience: Number(s.experience || 0),
      })),
    };

    const res = await dispatch(upsertEmployee(payload) as any);

    if (res.success) {
      alert("Employee saved successfully!");
    } else {
      alert("Error: " + res.data);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#EFE6F6",
        padding: "120px 24px 40px", // space below navbar
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "90%",
          margin: "auto",
          borderRadius: 4,
          background: "rgba(252, 248, 248, 0.55)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold">
          Employee Details Form
        </Typography>

        {/* BASIC DETAILS */}
        <Typography variant="h6" mt={3} mb={2}>
          Basic Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Employee ID"
              fullWidth
              name="employeeId"
              required
              value={form.employeeId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Employee Name"
              fullWidth
              name="employeeName"
              required
              value={form.employeeName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Employee Email"
              fullWidth
              name="employeeEmail"
              disabled
              value={form.employeeEmail}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Contact Number"
              fullWidth
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="date"
              label="Date of Birth"
              fullWidth
              name="dob"
              InputLabelProps={{ shrink: true }}
              value={form.dob}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Work Location"
              fullWidth
              name="workLocation"
              value={form.workLocation}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* EMPLOYMENT INFORMATION */}
        <Typography variant="h6" mt={4} mb={2}>
          Employment Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              select
              label="Employment Type"
              fullWidth
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
            >
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Role"
              fullWidth
              name="role"
              disabled
              value={form.role}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Department"
              fullWidth
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Team"
              fullWidth
              name="team"
              value={form.team}
              onChange={handleChange}
            />
          </Grid>

          {/* <Grid item xs={4}>
            <TextField
              label="Manager ID"
              fullWidth
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid item xs={4}>
            <TextField
              select
              label="Reporting Manager"
              fullWidth
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
            >
              {managers.length === 0 ? (
                <MenuItem disabled>No managers available</MenuItem>
              ) : (
                managers.map((mgr) => (
                  <MenuItem key={mgr._id} value={mgr._id}>
                    {mgr.employeeName} ({mgr.employeeId})
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          {/* <Grid item xs={4}>
            <TextField
              label="Business Unit ID"
              fullWidth 
              name="businessUnitId"
              value={form.businessUnitId}
              onChange={handleChange}
            />
          </Grid> */}

          <Grid item xs={4}>
            <TextField
              select
              label="Business Unit"
              fullWidth
              name="businessUnitId"
              value={form.businessUnitId}
              onChange={handleChange}
            >
              {businessUnits.map((bu) => (
                <MenuItem key={bu._id} value={bu._id}>
                  {bu.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* EXPERIENCE */}
        <Typography variant="h6" mt={4} mb={2}>
          Experience
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Total Experience"
              fullWidth
              name="totalExperience"
              value={form.totalExperience}
              onChange={handleChange}
            />
          </Grid>

          {/* <Grid item xs={4}>
            <TextField
              label="Previous Projects"
              fullWidth
              name="previousProjects"
              value={form.previousProjects}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Previous Companies"
              fullWidth
              name="previousCompanies"
              value={form.previousCompanies}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Current Projects"
              fullWidth
              name="currentProjects"
              value={form.currentProjects}
              onChange={handleChange}
            />
          </Grid> */}
          <Grid item xs={4}>
            <TextField
              label="Previous Projects"
              name="previousProjects"
              fullWidth
              placeholder="Project1, Project2"
              value={form.previousProjects}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Previous Companies"
              name="previousCompanies"
              fullWidth
              placeholder="Company1, Company2"
              value={form.previousCompanies}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Current Projects"
              name="currentProjects"
              fullWidth
              placeholder="ProjectA, ProjectB"
              value={form.currentProjects}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* SKILLS */}
        <Typography variant="h6" mt={4} mb={2}>
          Skills
        </Typography>

        {form.skills.map((skill, index) => (
          <Grid container spacing={2} key={index} mb={1}>
            <Grid item xs={4}>
              <TextField
                label="Skill Name"
                fullWidth
                required
                value={skill.skillName}
                onChange={(e) =>
                  handleSkillChange(index, "skillName", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Proficiency Level"
                fullWidth
                value={skill.proficiencyLevel}
                onChange={(e) =>
                  handleSkillChange(index, "proficiencyLevel", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={3}>
              {/* <TextField
                label="Experience (Years)"
                fullWidth
                value={skill.experience}
                onChange={(e) =>
                  handleSkillChange(index, "experience", e.target.value)
                }
              /> */}
              <TextField
                label="Experience (Years)"
                type="number"
                fullWidth
                value={skill.experience}
                onChange={(e) =>
                  handleSkillChange(index, "experience", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={1} display="flex" alignItems="center">
              <IconButton color="error" onClick={() => removeSkill(index)}>
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button startIcon={<AddCircleIcon />} sx={{ mt: 1 }} onClick={addSkill}>
          Add Skill
        </Button>

        <Box mt={4} textAlign="center">
          {/* <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 3,
              background: "#8347AD",
            }}
          >
            Submit
          </Button> */}
          <Button
            variant="contained"
            sx={{ px: 4, py: 1.2, borderRadius: 3, background: "#8347AD" }}
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
