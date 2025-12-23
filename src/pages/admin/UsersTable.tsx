import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/adminActions";
import type { RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUserById } from "../../services/adminService";
import { useSnackbar } from "../../context/SnackbarContext";
import LogoLoader from "../../components/common/LogoLoader";

const UsersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { users, loading, total } = useSelector(
    (state: RootState) => state.admin
  );
  const { showMessage } = useSnackbar();

  const urlParams = new URLSearchParams(location.search);
  const initialSearch =
    urlParams.get("search") || sessionStorage.getItem("search") || "";
  const initialRole =
    urlParams.get("role") || sessionStorage.getItem("role") || "all";
  const initialPage =
    Number(urlParams.get("page") || sessionStorage.getItem("page")) || 0;
  const initialLimit =
    Number(urlParams.get("limit") || sessionStorage.getItem("limit")) || 10;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [roleFilter, setRoleFilter] = useState(initialRole);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageLimit, setPageLimit] = useState(initialLimit);

  const fetchUsers = useCallback(() => {
    dispatch(
      getUsers({
        search: searchTerm || undefined,
        role: roleFilter === "all" ? undefined : roleFilter,
        page: currentPage + 1,
        limit: pageLimit,
      }) as any
    );

    sessionStorage.setItem("search", searchTerm);
    sessionStorage.setItem("role", roleFilter);
    sessionStorage.setItem("page", String(currentPage));
    sessionStorage.setItem("limit", String(pageLimit));

    // Update URL params
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (roleFilter) params.append("role", roleFilter);
    params.append("page", String(currentPage));
    params.append("limit", String(pageLimit));
    navigate({ search: params.toString() }, { replace: true });
  }, [searchTerm, roleFilter, currentPage, pageLimit, dispatch, navigate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(0); // reset page when search/role changes
    }, 300); // debounce 300ms

    return () => clearTimeout(handler);
  }, [searchTerm, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter, currentPage, pageLimit, fetchUsers]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageLimit(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  // const handleDelete = async (userId: string) => {
  //   const res = await deleteUserById(userId);
  //   if (res.success) {
  //     fetchUsers();
  //     showMessage("User Deleted.");
  //   }
  //   console.log("res delte", res);
  // };
  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    const res = await deleteUserById(selectedUserId);
    if (res.success) {
      fetchUsers();
      showMessage("User deleted successfully");
    }

    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleEdit = (userId: string) => {
    navigate(`/admin/update-user/${userId}`);
  };

  return (
    <Box sx={{ backgroundColor: "#f4f2f5ff", padding: 1 }}>
      <Paper sx={{ padding: 2, borderRadius: 3, margin: 2, mt: 10 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Users List
        </Typography>

        {/* Filters */}
        <Stack
          direction="row"
          justifyContent={"space-between"}
          spacing={2}
          mb={2}
        >
          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              label="Role"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="reporting manager">Reporting Manager</MenuItem>
              <MenuItem value="associate manager">Associate Manager</MenuItem>
              <MenuItem value="VP">VP</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Search User"
            placeholder="Search by name or email."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 250 }}
            InputProps={{
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* Table */}
        <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <LogoLoader size={12} />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {user.role}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user._id)}
                      >
                        <EditIcon
                          sx={{
                            "&:hover": {
                              transform: "scale(1.06)",
                            },
                          }}
                        />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <DeleteIcon
                          sx={{
                            "&:hover": {
                              transform: "scale(1.06)",
                            },
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={total}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={pageLimit}
            onRowsPerPageChange={handleLimitChange}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Box>
      </Paper>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTable;
