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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MoreVertical } from "lucide-react";
import React from "react";
import type { ColumnVisibility } from "../../pages/admin/AdminDashboard";
export interface EmployeeDirectoryProps {
  handleColumnMenuOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  columnMenuAnchor: HTMLElement | null;
  handleColumnMenuClose: () => void;

  allColumns: Array<{
    field: string;
    headerName: string;
    width: number;
    renderCell?: (params: any) => React.ReactNode;
  }>;

  toggleColumn: (field: keyof ColumnVisibility) => void;

  columnVisibility: Record<string, boolean>;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  filteredEmployees: any[];
  visibleColumns: any[];
}

const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({
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
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Paper sx={{ p: 3, borderRadius: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Employee Directory
            </Typography>

            <IconButton onClick={handleColumnMenuOpen}>
              <MoreVertical />
            </IconButton>
          </Box>

          <Menu
            anchorEl={columnMenuAnchor}
            open={Boolean(columnMenuAnchor)}
            onClose={handleColumnMenuClose}
          >
            {/* {allColumns.map((col) => (
              <MenuItem key={col.field} onClick={() => toggleColumn(col.field)}>
                <Checkbox checked={columnVisibility[col.field]} />
                <ListItemText primary={col.headerName} />
              </MenuItem>
            ))} */}
            {allColumns.map((col) => {
              const field = col.field as keyof ColumnVisibility;

              return (
                <MenuItem key={field} onClick={() => toggleColumn(field)}>
                  <Checkbox checked={columnVisibility[field]} />
                  <ListItemText primary={col.headerName} />
                </MenuItem>
              );
            })}
          </Menu>

          <Box sx={{ maxWidth: 320, mb: 2, mt: 2 }}>
            <TextField
              placeholder="Search..."
              fullWidth
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <DataGrid
            rows={filteredEmployees}
            columns={visibleColumns}
            getRowId={(row) => row._id}
            autoHeight
            disableColumnFilter
            disableColumnSelector
          />
        </Paper>
      </Box>
    </div>
  );
};

export default EmployeeDirectory;
