import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import type { LogType } from "./HierarchyAccordion";
const headerCellStyle = {
  fontWeight: "bold",
  fontSize: "0.8rem",
  whiteSpace: "nowrap",
  borderBottom: "1px solid #d6d6d6ff",
};

const bodyCellStyle = {
  fontSize: "0.8rem",
  whiteSpace: "nowrap",
};

const LogsTable = ({ logs }: { logs: LogType[] }) => {
  if (!logs?.length) return null;

  return (
    // <TableContainer
    //   component={Paper}
    //   sx={{
    //     mt: 2,
    //     overflowX: "auto",
    //     borderRadius: "8px",
    //     border: "1px solid #d6d6d6ff",
    //   }}
    // >
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        overflowX: "auto",
        borderRadius: "8px",
        border: "1px solid #d6d6d6ff",

        /* Firefox */
        scrollbarWidth: "thin",
        scrollbarColor: "#8347ad #EFE6F6",

        /* Chrome / Edge / Safari */
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#EFE6F6",
          borderRadius: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#7B1FA2",
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "#6A1B9A",
          },
        },
      }}
    >
      <Table
        size="small"
        stickyHeader
        sx={{
          minWidth: 1000,
          fontSize: "0.8rem", // 80%
        }}
      >
        {/* TABLE HEADER */}
        <TableHead sx={{ backgroundColor: "#EFE6F6" }}>
          <TableRow sx={{ height: 40 }}>
            <TableCell sx={headerCellStyle}>Requirement Type</TableCell>
            <TableCell sx={headerCellStyle}>Client Name</TableCell>
            <TableCell sx={headerCellStyle}>Project Name</TableCell>
            <TableCell sx={headerCellStyle}>Project Code</TableCell>
            <TableCell sx={headerCellStyle}>Priority Level</TableCell>
            <TableCell sx={headerCellStyle}>Expected Start Date</TableCell>
            <TableCell sx={headerCellStyle}>Expected End Date</TableCell>
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {logs.map((log, i) => (
            <TableRow
              key={i}
              sx={{
                height: 40,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#e3e3e3ff",
                },
              }}
            >
              <TableCell sx={bodyCellStyle}>{log.requirementType}</TableCell>
              <TableCell sx={bodyCellStyle}>{log.clientName}</TableCell>
              <TableCell sx={bodyCellStyle}>{log.projectName}</TableCell>
              <TableCell sx={bodyCellStyle}>{log.projectCode}</TableCell>
              <TableCell sx={bodyCellStyle}>{log.urgency}</TableCell>
              <TableCell sx={bodyCellStyle}>{log.expectedStartDate}</TableCell>
              <TableCell sx={bodyCellStyle}>{log.expectedEndDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
