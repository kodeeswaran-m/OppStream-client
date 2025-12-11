import { useEffect, useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  createBusinessUnit,
  getBusinessUnits,
} from "../../store/actions/adminActions";

import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

const CreateBusinessUnit = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state: RootState) => state.admin
  );

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch<any>(getBusinessUnits());
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const res = await dispatch<any>(createBusinessUnit(name));

    if (res.success) setName("");
  };

  return (
    <Grid sx={{ backgroundColor: "#EFE6F6" , height:"100vh"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 4,
            mt: 16,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Create Business Unit
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Business Unit Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1, fontSize: "12px" }}
            >
              {loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Paper>
      </Box>
    </Grid>
  );
};

export default CreateBusinessUnit;

// import { useEffect, useState, type FormEvent } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../../store";
// import { createBusinessUnit, getBusinessUnits } from "../../store/actions/adminActions";

// const CreateBusinessUnit = () => {
//   const dispatch = useDispatch();
//   const { loading, message, error, businessUnits } = useSelector(
//     (state: RootState) => state.admin
//   );
// console.log("business unit", businessUnits);
//   const [name, setName] = useState("");
// useEffect( ()=>{
//       const res =  dispatch<any>(getBusinessUnits());
//   console.log("BU's", res);
// },[])
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) return;

//     const res = await dispatch<any>(createBusinessUnit(name));

//     if (res.success) setName("");
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "40px auto" }}>
//       <h2>Create Business Unit</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <label>Business Unit Name</label>
//         <input
//           type="text"
//           placeholder="Enter business unit name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBusinessUnit;
