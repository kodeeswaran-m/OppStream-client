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
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type Skill = {
  skillName: string;
  proficiencyLevel: string;
  experience: string;
};

const EmployeeFormPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    employeeId: "",
    employeeName: "",
    employeeEmail: user?.email || "",
    contactNumber: "",
    dob: "",
    workLocation: "",
    employmentType: "Full Time",
    role: "EMP",
    department: "",
    team: "",
    managerId: "",
    businessUnitId: "",
    totalExperience: "",
    previousProjects: "",
    previousCompanies: "",
    currentProjects: "",
    skills: [{ skillName: "", proficiencyLevel: "", experience: "" }] as Skill[],
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index: number, key: keyof Skill, value: string) => {
    const updated = [...form.skills];
    updated[index][key] = value;
    setForm({ ...form, skills: updated });
  };

  const addSkill = () => {
    setForm({
      ...form,
      skills: [...form.skills, { skillName: "", proficiencyLevel: "", experience: "" }],
    });
  };

  const removeSkill = (index: number) => {
    const updated = [...form.skills];
    updated.splice(index, 1);
    setForm({ ...form, skills: updated });
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
            <TextField label="Role" fullWidth name="role" disabled value={form.role} />
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

          <Grid item xs={4}>
            <TextField
              label="Manager ID"
              fullWidth
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Business Unit ID"
              fullWidth
              name="businessUnitId"
              value={form.businessUnitId}
              onChange={handleChange}
            />
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

          <Grid item xs={4}>
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
                onChange={(e) => handleSkillChange(index, "skillName", e.target.value)}
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
              <TextField
                label="Experience (Years)"
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
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 3,
              background: "#8347AD",
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmployeeFormPage;
