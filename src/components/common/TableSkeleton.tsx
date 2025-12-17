import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

const TableSkeleton = ({ rows = 7, columns = 8 }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table size="medium">
        {/* Header Skeleton */}
        <TableHead>
          <TableRow>
            {Array.from({ length: columns }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton
                  animation="wave"
                  height={20}
                  width="80%"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Body Skeleton */}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton
                    animation="wave"
                    height={18}
                    width={
                      colIndex === columns - 1
                        ? "40%"
                        : "70%"
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
