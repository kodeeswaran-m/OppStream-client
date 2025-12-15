import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Card,
  CardContent,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const PageContainer = styled(Box)(() => ({
  padding: "30px",
  background: "#F5F7FA",
  minHeight: "100vh",
}));

const SectionCard = styled(Card)(() => ({
  marginBottom: "25px",
  borderRadius: 16,
  boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
}));

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "18px",
  marginBottom: "12px",
  color: "#4A148C",
}));

const Label = styled("span")(() => ({
  fontWeight: 600,
  color: "#444",
}));

// Purple Stepper
const PurpleConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    transition: "all 0.4s ease",
  },

  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#7B1FA2",
  },

  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#7B1FA2",
  },
}));

interface Approval {
  role: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approverName: string;
  approvedAt?: string;
}

interface LogDetailsProps {
  log: any;
}

const LogDetailsPage: React.FC<LogDetailsProps> = ({ log }) => {
  const [activeStep, setActiveStep] = useState(0);

  const hasAnyAction = log.approvals.some(
    (a: Approval) => a.status !== "PENDING"
  );

  const finalActiveStepIndex = log.approvals.findIndex(
    (a: Approval) => a.status === "PENDING"
  );

  const finalStep =
    finalActiveStepIndex === -1
      ? log.approvals.length
      : finalActiveStepIndex;

  useEffect(() => {
    if (!hasAnyAction) return;
    let current = 0;

    const interval = setInterval(() => {
      if (current <= finalStep) {
        setActiveStep(current);
        current++;
      } else clearInterval(interval);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer sx={{ backgroundColor:"#ede9f0ff"}}>
      <Typography variant="h4" fontWeight={700} color="primary" sx={{ mb: 3, mt:6 }}>
        Log Details
      </Typography>

      {/* SECTION: CREATOR */}
      <SectionCard>
        <CardContent>
          <SectionTitle>Created By</SectionTitle>
          <Typography>
            <Label>Name:</Label> {log.createdBy?.employeeName}
          </Typography>
          <Typography>
            <Label>Employee ID:</Label> {log.createdBy?.employeeId}
          </Typography>
        </CardContent>
      </SectionCard>

      {/* SECTION: APPROVAL FLOW */}
      <SectionCard>
        <CardContent>
          <SectionTitle>Approval Flow</SectionTitle>

          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<PurpleConnector />}
            sx={{ mt: 3, mb: 1 }}
          >
            {log.approvals.map((a: Approval, i: number) => (
              <Step key={i} completed={a.status !== "PENDING"}>
                <StepLabel
                  error={a.status === "REJECTED"}
                  optional={
                    a.approvedAt ? (
                      <Typography variant="caption" color="text.secondary">
                        {a.status} • {new Date(a.approvedAt).toLocaleString()}
                      </Typography>
                    ) : null
                  }
                >
                  {a.role} – {a.approverName}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </SectionCard>

      {/* REQUIREMENT TYPE */}
      <SectionCard>
        <CardContent>
          <SectionTitle>Requirement</SectionTitle>
          <Typography>
            <Label>Requirement Type:</Label> {log.requirementType}
          </Typography>
        </CardContent>
      </SectionCard>

      {/* NN SECTION */}
      {log.requirementType === "NN" && (
        <SectionCard>
          <CardContent>
            <SectionTitle>NN Details</SectionTitle>
            <Typography><Label>Description:</Label> {log.nnDetails?.description}</Typography>
            <Typography><Label>Client Name:</Label> {log.nnDetails?.clientName}</Typography>
            <Typography><Label>Source:</Label> {log.nnDetails?.source}</Typography>
            <Typography><Label>Opportunity From:</Label> {log.nnDetails?.oppFrom}</Typography>
          </CardContent>
        </SectionCard>
      )}

      {/* EE / EN SECTION */}
      {(log.requirementType === "EE" || log.requirementType === "EN") && (
        <SectionCard>
          <CardContent>
            <SectionTitle>Opportunity From</SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography><Label>Project Name:</Label> {log.oppFrom?.projectName}</Typography>
                <Typography><Label>Client Name:</Label> {log.oppFrom?.clientName}</Typography>
                <Typography><Label>Project Code:</Label> {log.oppFrom?.projectCode}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><Label>Urgency:</Label> {log.oppFrom?.urgency}</Typography>
                <Typography><Label>Meeting Type:</Label> {log.oppFrom?.meetingType}</Typography>
                <Typography><Label>Meeting Date:</Label> {log.oppFrom?.meetingDate}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Label>People Present:</Label>
                <Stack direction="row" spacing={2} mt={1}>
                  {log.oppFrom?.peoplePresent?.map((p: any, idx: number) => (
                    <Paper key={idx} sx={{ px: 2, py: 1, borderRadius: 4 }}>
                      {p.name}
                    </Paper>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </SectionCard>
      )}

      {/* OPP TO SECTION */}
      <SectionCard>
        <CardContent>
          <SectionTitle>Opportunity To</SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography><Label>Category:</Label> {log.oppTo?.category}</Typography>
              <Typography><Label>Total Persons:</Label> {log.oppTo?.totalPersons}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography><Label>Short Description:</Label> {log.oppTo?.shortDescription}</Typography>
              <Typography><Label>Technology Required:</Label> {log.oppTo?.technologyRequired?.join(", ")}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography><Label>Detailed Notes:</Label> {log.oppTo?.detailedNotes}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Label>Tech Rows:</Label>
              <Stack mt={1} spacing={1}>
                {log.oppTo?.techRows?.map((row: any, i: number) => (
                  <Paper key={i} sx={{ p: 2, borderRadius: 3, background: "#F1F1F1" }}>
                    {row.technology} — {row.count}
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </SectionCard>

      {/* TIMELINE */}
      <SectionCard>
        <CardContent>
          <SectionTitle>Timeline</SectionTitle>
          <Typography><Label>Expected Start:</Label> {log.timeline?.expectedStart}</Typography>
          <Typography><Label>Expected End:</Label> {log.timeline?.expectedEnd}</Typography>
        </CardContent>
      </SectionCard>
    </PageContainer>
  );
};

export default LogDetailsPage;


