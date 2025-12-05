import { useEffect, useState } from "react";
import { getLogById } from "../../services/logService";
import { useParams } from "react-router-dom";
import LogDetailsPage from "../../components/common/LogDetailsPage";
import { CircularProgress, Box } from "@mui/material";

const LogDetailsPageWrapper = () => {
  const { id } = useParams();
  const [log, setLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log("log from log wrapper", log);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await getLogById(id!);
        setLog(res.log);
      } catch (error) {
        console.error("Error fetching log:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return log ? <LogDetailsPage log={log} /> : <h3>Log not found</h3>;
};

export default LogDetailsPageWrapper;
