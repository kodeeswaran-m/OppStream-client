

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import LogsTable from "./LogTable";

export type Role = "ACCOUNT_MANAGER" | "REPORTING_MANAGER" | "EMPLOYEE";

export type LogType = {
  clientName: string;
  expectedEndDate: string;
  expectedStartDate: string;
  projectCode: string;
  projectName: string;
  requirementType: string;
  urgency: string;
};

export type NodeType = {
  id: string;
  name: string;
  role: Role;
  logs: LogType[];
  children?: NodeType[];
};

const roleColors: Record<Role, string> = {
  ACCOUNT_MANAGER: "#6A1B9A",
  REPORTING_MANAGER: "#1565C0",
  EMPLOYEE: "#2E7D32",
};

const HierarchyAccordion = ({
  node,
  level = 0,
}: {
  node: NodeType;
  level?: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
      sx={{
        ml: level * 3,
        mb: 1,
        borderRadius: "8px",
        border: "1px solid #d6d6d6ff",
        boxShadow: "none",
        overflow: "hidden",
        "&:before": { display: "none" },
      }}
    >
      {/* ACCORDION HEADER */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#F5F0FA",
          minHeight: 44,
          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            gap: 1,
          },
          "&:hover": {
            backgroundColor: "#e3e3e3ff",
          },
        }}
      >
        <Chip
          size="small"
          label={node.role.replace("_", " ")}
          sx={{
            fontSize: "0.7rem",
            height: 20,
            color: "#fff",
            backgroundColor: roleColors[node.role],
          }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          {node.name}
        </Typography>
      </AccordionSummary>

      {/* ACCORDION CONTENT */}
      <AccordionDetails
        sx={{
          backgroundColor: "#fff",
          pt: 2,
          pb: 1,
        }}
      >
        {/* Logs Table */}
        {expanded && node.logs.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <LogsTable logs={node.logs} />
          </Box>
        )}

        {/* Children Accordions */}
        {expanded &&
          node.children?.map((child) => (
            <HierarchyAccordion
              key={child.id}
              node={child}
              level={level + 1}
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default HierarchyAccordion;

