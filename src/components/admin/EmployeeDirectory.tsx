import React, { useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { MoreVertical } from "lucide-react";

import type { ColumnVisibility } from "../../pages/admin/AdminDashboard";

/* ================= SORT TYPES ================= */

type SortDirection = "asc" | "desc";

interface SortState {
  field: keyof ColumnVisibility;
  direction: SortDirection;
}

/* ================= SORTABLE FIELDS ================= */

const SORTABLE_FIELDS: Array<keyof ColumnVisibility> = [
  "employeeId",
  
  "department",
  "team",
  "role",
  "totalExperience",
  "isAvailable",
];

/* ================= COMPONENT ================= */

const EmployeeDirectory: React.FC<any> = ({
  handleColumnMenuOpen,
  columnMenuAnchor,
  handleColumnMenuClose,
  allColumns,
  toggleColumn,
  columnVisibility,
  search,
  setSearch,
  filteredEmployees,
  visibleColumns,
}) => {
  /* ================= SORT STATE ================= */

  const [sort, setSort] = useState<SortState>({
    field: "isAvailable", // default
    direction: "desc", // Available first
  });

  /* ================= SEARCH ================= */

  const searchedEmployees = useMemo(() => {
    if (!search.trim()) return filteredEmployees;

    const value = search.toLowerCase();
    return filteredEmployees.filter(
      (emp: any) =>
        emp.employeeName?.toLowerCase().includes(value) ||
        emp.employeeId?.toLowerCase().includes(value)
    );
  }, [search, filteredEmployees]);

  /* ================= SORT LOGIC ================= */

  const sortedEmployees = useMemo(() => {
    const data = [...searchedEmployees];

    data.sort((a: any, b: any) => {
      const valA = a[sort.field];
      const valB = b[sort.field];

      if (sort.field === "isAvailable") {
        return sort.direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      if (typeof valA === "string") {
        return sort.direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });

    return data;
  }, [searchedEmployees, sort]);

  /* ================= SORT HANDLER ================= */

  const handleSort = (field: keyof ColumnVisibility) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  /* ================= SORT ICONS ================= */

  const renderSortIcons = (field: string) => {
  const isActive = sort.field === field;

  // 🔹 Not active → show UnfoldMore
  if (!isActive) {
    return (
      <UnfoldMoreIcon
        fontSize="small"
        sx={{ ml: 0.5, color: "#504b4bff" }}
      />
    );
  }

  // 🔹 Active ASC → show only UP arrow
  if (sort.direction === "asc") {
    return (
      <ArrowUpwardIcon
        fontSize="small"
        sx={{ ml: 0.5, color: "#000" }}
      />
    );
  }

  // 🔹 Active DESC → show only DOWN arrow
  return (
    <ArrowDownwardIcon
      fontSize="small"
      sx={{ ml: 0.5, color: "#000" }}
    />
  );
};


  /* ================= UI ================= */

  return (
    <Box sx={{ mt: 5 }}>
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Employee Directory
          </Typography>

          <Tooltip title="Show / Hide Columns">
            <IconButton onClick={handleColumnMenuOpen}>
              <MoreVertical />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Column Toggle Menu */}
        <Menu
          anchorEl={columnMenuAnchor}
          open={Boolean(columnMenuAnchor)}
          onClose={handleColumnMenuClose}
        >
          {allColumns.map((col: any) => (
            <MenuItem
              key={col.field}
              onClick={() => toggleColumn(col.field)}
            >
              <Checkbox checked={columnVisibility[col.field]} />
              <ListItemText primary={col.headerName} />
            </MenuItem>
          ))}
        </Menu>

        {/* Search */}
        <Box sx={{ maxWidth: 320, mb: 2, mt: 2 }}>
          <TextField
            placeholder="Search by Name or Employee ID"
            fullWidth
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              {visibleColumns.map((col: any) => (
                <TableCell
  key={col.field}
  sx={{
    fontWeight: 600,
    cursor: SORTABLE_FIELDS.includes(col.field)
      ? "pointer"
      : "default",
  }}
  onClick={() =>
    SORTABLE_FIELDS.includes(col.field) &&
    handleSort(col.field)
  }
>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {col.headerName}
    {SORTABLE_FIELDS.includes(col.field) &&
      renderSortIcons(col.field)}
  </Box>
</TableCell>

              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedEmployees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length}
                  align="center"
                >
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              sortedEmployees.map((row: any) => (
                <TableRow key={row._id} hover>
                  {visibleColumns.map((col: any) => (
                    <TableCell key={col.field}>
                      {col.renderCell
                        ? col.renderCell({ row })
                        : row[col.field] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default EmployeeDirectory;
